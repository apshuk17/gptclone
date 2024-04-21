import { type TourResponseType, type TourDetailsType } from "@/utils/actions";


type TourInfoProps = {
    tour: TourDetailsType
}

function TourInfo({ tour }: TourInfoProps ) {
    const { title, description, stops } = tour;
    return (
        <div className='max-w-2xl'>
            <h1 className='text-4xl font-semibold mb-4'>{title}</h1>
            <p className='leading-loose mb-6'>{description}</p>
            <ul>
                {stops.map((stop) => {
                    return (
                        <li key={stop?.toString()} className='mb-4 bg-base-100 p-4 rounded-xl'>
                            <p>{stop?.toString()}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TourInfo;