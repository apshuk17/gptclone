import { TourInfo } from "@/components/tours";
import { getSingleTour } from "@/utils/actions";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

type SingleTourPageProps = {
    params: {
        id: string
    }
}

async function SingleTourPage({ params }: SingleTourPageProps) {
    const { id } = params;

    const tour = await getSingleTour(id)

    if (!tour) {
        redirect('/tours')
    }

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
            <TourInfo tour={tourInfo} />
        </div>
    )

}

export default SingleTourPage;