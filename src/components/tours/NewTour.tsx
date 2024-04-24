'use client';

import { type FormEvent } from "react"
import { Prisma } from "@prisma/client";
import { TourInfo } from "@/components/tours";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getExistingTour, generateTourResponse, createNewTour, type TourType } from '@/utils/actions/tour-actions';
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { fetchUserTokensById, subtractTokens } from "@/utils/actions/token-actions";

function NewTour() {

    const queryClient = useQueryClient()
    const { userId } = useAuth()

    const { mutate, isPending, data: tour } = useMutation({
        mutationFn: async (destination: TourType) => {
            // Check if this tour already exist
            const existingTour = await getExistingTour(destination);

            if (existingTour) {
                return {
                    city: existingTour.city,
                    country: existingTour.country,
                    title: existingTour.title,
                    description: existingTour.description,
                    stops: existingTour.stops as Prisma.JsonArray,
                }
            };

            // get the current user tokens from the database
            let currentTokens;
            
            if (userId) {
                currentTokens = await fetchUserTokensById(userId);
            }

            // Abort the call to Open AI if the tokens are less than 300
            if (currentTokens && currentTokens < 300) {
                toast.error('Token balance too low...')
                return;
            }

            // Generate a new tour if there is no existing tour
            const newTour = await generateTourResponse(destination)

            if (!newTour) {
                toast.error('No matching city found...');
                return null;
            }

            // Add this new tour to database
            await createNewTour(newTour.tour);

            // Invalidate the existing query
            queryClient.invalidateQueries({ queryKey: ['tours'] });

            // Calculate the remaining tokens, newTour.tokens are the tokens consumed by the Open AI
            if (userId && newTour.tokens){
                const newTokens = await subtractTokens(userId, newTour.tokens)
                toast.success(`${newTokens} tokens remaining`)
            }

            return newTour.tour;


        }
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const destination = Object.fromEntries(formData.entries());
        const city = destination.city;
        const country = destination.country;
        mutate({ city, country })
    }

    if (isPending) {
        return <span className='loading loading-lg'></span>;
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-2xl">
                <h2 className='mb-4'>Select your dream destination</h2>
                <div className='join w-full'>
                    <input
                        type='text'
                        className='input input-bordered join-item w-full'
                        placeholder='city'
                        name='city'
                        required
                    />
                    <input
                        type='text'
                        className='input input-bordered join-item w-full'
                        placeholder='country'
                        name='country'
                        required
                    />
                    <button className='btn btn-primary join-item' type='submit'>
                        generate tour
                    </button>
                </div>
            </form>
            {tour && <div className='mt-16'>{tour && <TourInfo tour={tour} />}</div>}

        </>
    )
}

export default NewTour