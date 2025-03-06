import { useEffect, useState } from 'react';
import useTracks from '@hooks/useTracks';
import type { TrackType } from '@/types/TrackType';
import TrackOverview from '@components/TrackOverview';

const Promos = () => {
    const { getAllTracks } = useTracks();
    const [tracks, setTracks] = useState<TrackType[]>([]);

    useEffect(() => {
        getAllTracks().then((tracks) => {
            setTracks(tracks);
        });
    }, [getAllTracks]);

    return (
        <div className="p-12">
            <h1 className="text-2xl md:text-3xl font-bold text-left md:w-xl lg:w-3xl">
                Your Promos
            </h1>
            <div className="flex flex-col gap-y-2 mt-4">
                {tracks.map((track) => (
                    <TrackOverview track={track} key={track.id} />
                ))}
            </div>
        </div>
    );
};

export default Promos;
