'use client';

import { type FormEvent } from "react"
import { Prisma } from "@prisma/client";
import { TourInfo } from "@/components/tours";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getExistingTour, generateTourResponse, createNewTour, type TourType } from '@/utils/actions';
import toast from "react-hot-toast";

function NewTour() {

    const queryClient = useQueryClient()

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

            const newTour = await generateTourResponse(destination)

            if (newTour) {
                // Add this new tour to database
                await createNewTour(newTour.tour);

                // Invalidate the existing query
                queryClient.invalidateQueries({ queryKey: ['tours'] });
                
                return newTour.tour;
            }

            toast.error('No matching city found...');
            return null;
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