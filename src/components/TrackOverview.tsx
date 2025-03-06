import React, { useState } from 'react';
import type { TrackType } from '@/types/TrackType';
import { Eye, Link, Play, DownloadSimple, Trash, Plus } from '@phosphor-icons/react';
import { getMostRecentActivity } from '@utils/dateFormatter';
import PromoOverview from '@components/PromoOverview';
import usePromo from '@hooks/usePromo';
import type { PromoType } from '@/types/PromoType';

interface TrackOverviewProps {
    track: TrackType;
}

const TrackOverview: React.FC<TrackOverviewProps> = ({ track }) => {
    const [promosPanelOpen, setPromosPanelOpen] = useState(false);
    const { insertPromo } = usePromo();

    const handleCreatePromo = () => {
        const newPromo: PromoType = {
            id: crypto.randomUUID(),
            receiver: '',
            views: 0,
            plays: 0,
            downloads: 0,
            lastActivity: null,
            trackId: track.id,
        };
        insertPromo(newPromo);
    };

    return (
        <>
            <div className="flex ">
                <div className="flex flex-1 items-center mb-4">
                    <img
                        src={track.albumCover}
                        className="w-18 h-18 rounded-lg cursor-pointer"
                        alt={`${track.title} album cover`}
                        onClick={() => alert('play')}
                    />
                    <div className="ml-6 flex flex-col">
                        <span className="text-md font-semibold text-zinc-500">
                            {track.artists}
                        </span>
                        <span className="text-lg font-bold text-zinc-50">
                            {track.title}
                        </span>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center gap-x-2 w-16">
                        <Eye
                            className="text-zinc-300"
                            size={18}
                            weight="bold"
                        />
                        <p className="text-zinc-300 font-semibold">
                            {track.promos.reduce(
                                (total, promo) => total + promo.views,
                                0,
                            )}
                        </p>
                    </div>
                    <div className="flex items-center gap-x-2 w-16">
                        <Play
                            className="text-zinc-300"
                            size={18}
                            weight="bold"
                        />
                        <p className="text-zinc-300 font-semibold">
                            {track.promos.reduce(
                                (total, promo) => total + promo.plays,
                                0,
                            )}
                        </p>
                    </div>
                    <div className="flex items-center gap-x-2 w-16 ">
                        <DownloadSimple
                            className="text-zinc-300"
                            size={18}
                            weight="bold"
                        />
                        <p className="text-zinc-300 font-semibold">
                            {track.promos.reduce(
                                (total, promo) => total + promo.downloads,
                                0,
                            )}
                        </p>
                    </div>
                    <span className="text-sm font-regular w-60 text-zinc-300 text-center font-bold">
                        {'Last Activity: ' +
                            getMostRecentActivity(track.promos)}
                    </span>
                    <button
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-500 cursor-pointer hover:bg-cyan-400"
                        onClick={() => setPromosPanelOpen(!promosPanelOpen)}
                    >
                        <Link weight="bold" />
                    </button>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-500 ml-2 hover:bg-red-400 cursor-pointer">
                        <Trash weight="bold" />
                    </button>
                </div>
            </div>
            {promosPanelOpen && (
                <div className="flex flex-col rounded-lg shadow-lg mb-4 gap-y-3 mt-2">
                    {track.promos.map((promo, index) => (
                        <PromoOverview promo={promo} key={index} />
                    ))}
                    <div
                        onClick={handleCreatePromo}
                        className="flex items-center mt-1 gap-1 cursor-pointer text-cyan-500 hover:text-cyan-400"
                    >
                        <Plus size={14} />
                        <span className="font-medium text-sm">Create Promo Link</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default TrackOverview;
