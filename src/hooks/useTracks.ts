import { tracks } from '../api/tracks';
import { TrackType } from '../types/TrackType';

/**
 * Hook for retrieving track data.
 *
 * @returns An object with a function to fetch all tracks.
 */
const useTracks = () => {
    /**
     * API call to retrieve all tracks.
     *
     * Returns a promise that resolves to an array of TrackType.
     *
     * @returns {Promise<TrackType[]>} A promise resolving to an array of track objects.
     */
    const getAllTracks = (): Promise<TrackType[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(tracks);
            }, 200);
        });
    };

    return {
        getAllTracks,
    };
};

export default useTracks;
