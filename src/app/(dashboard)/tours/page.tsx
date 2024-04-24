import { ToursPage as ToursDetails } from "@/components/tours";
import { getAllTours } from "@/utils/actions/tour-actions";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

async function ToursPage() {
    const queryClient = new QueryClient();

    /**
     * Prefetch the data on the server.
     * This will help to render the tours details on the server
     */
    await queryClient.prefetchQuery({
        queryKey: ['tours', ''],
        queryFn: () => getAllTours()
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ToursDetails />
        </HydrationBoundary>
    )
}

export default ToursPage;