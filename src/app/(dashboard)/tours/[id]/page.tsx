import { TourInfo } from "@/components/tours";
import { generateTourImage, getSingleTour } from "@/utils/actions/tour-actions";
import { Prisma } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type SingleTourPageProps = {
    params: {
        id: string
    }
}

const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

async function SingleTourPage({ params }: SingleTourPageProps) {
    const { id } = params;

    const tour = await getSingleTour(id)

    if (!tour) {
        redirect('/tours')
    }

    const { data } = await axios.get(`${url}${tour.city}`)
    const tourImage = data?.results[0]?.urls?.raw;

    // const tourImage = await generateTourImage({
    //     city: tour.city,
    //     country: tour.country
    // })

    const tourInfo = {
        city: tour.city,
        country: tour.country,
        title: tour.title,
        description: tour.description,
        stops: tour.stops as Prisma.JsonArray,
    }

    return (
        <div>
            <Link href="tours" className="btn btn-secondary mb-12">Back to tours</Link>
            {
                tourImage ? <div>
                    <Image
                        width={300}
                        height={300}
                        src={tourImage}
                        alt={tour.title}
                        className="rounded-xl shadow-xl mb-16 h-96 w-96 object-cover"
                        priority />
                </div> : null
            }
            <TourInfo tour={tourInfo} />
        </div>
    )

}

export default SingleTourPage;