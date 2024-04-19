import { NewTour } from "@/components/tours";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

function NewTourPage() {
    const queryClient = new QueryClient();
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NewTour />
        </HydrationBoundary>
    )
}

export default NewTourPage;