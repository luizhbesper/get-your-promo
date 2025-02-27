import { useEffect } from 'react';
import useTracks from '../hooks/useTracks';

const Promos = () => {
    const { getAllTracks } = useTracks();

    useEffect(() => {
        getAllTracks().then((tracks) => {
            console.log(tracks);
        });
    }, [getAllTracks]);

    return (
        <div className="p-12">
            <h1 className="text-2xl md:text-3xl font-bold text-left md:w-xl lg:w-3xl">
                Your Promos
            </h1>
            <div>
                <img
                    src="src/assets/img/artwork.png"
                    alt="Promo Album Cover"
                    className="absolute rounded-lg w-18 h-18"
                />
            </div>
        </div>
    );
};

export default Promos;
