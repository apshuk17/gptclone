import type { Tour } from '@prisma/client';
import TourCard from './TourCard';

type ToursListProps = {
    tours: Tour[]
}

function ToursList({ tours }: ToursListProps) {
    if (tours.length === 0) return <h4 className='text-lg'>No tours found...</h4>;

    return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
      {tours.map((tour) => {
        return <TourCard key={tour.id} tour={tour} />;
      })}
    </div>
  );
}

export default ToursList;