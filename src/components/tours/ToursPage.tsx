'use client';

import { getAllTours } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import ToursList from './ToursList';

function ToursPage() {
    const { data = [], isPending } = useQuery({
        queryKey: ['tours'],
        queryFn: () => getAllTours()
    })

    console.log('##tours', data);

    if (isPending) return <span className="loading"></span>;

    return <ToursList tours={data} />
}

export default ToursPage;