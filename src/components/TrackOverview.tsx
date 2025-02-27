import React from 'react';
import { TrackType } from '../types/TrackType';
import { Eye, Link, Play, DownloadSimple, Trash } from '@phosphor-icons/react';
import { getMostRecentActivity } from '../utils/dateFormatter';

interface TrackOverviewProps {
    track: TrackType;
}

const TrackOverview: React.FC<TrackOverviewProps> = ({ track }) => {
    return (
        <div className="flex">
            <div className="flex flex-1 items-center">
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
                    <Eye className="text-zinc-300" size={18} weight="bold" />
                    <p className="text-zinc-300 font-semibold">
                        {track.promos.reduce(
                            (total, promo) => total + promo.views,
                            0,
                        )}
                    </p>
                </div>
                <div className="flex items-center gap-x-2 w-16">
                    <Play className="text-zinc-300" size={18} weight="bold" />
                    <p className="text-zinc-300 font-semibold">
                        {track.promos.reduce(
                            (total, promo) => total + promo.views,
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
                            (total, promo) => total + promo.views,
                            0,
                        )}
                    </p>
                </div>
                <span className="text-sm font-regular w-60 text-zinc-300 text-center font-bold">
                    {'Last Activity: ' + getMostRecentActivity(track.promos)}
                </span>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-500 cursor-pointer hover:bg-cyan-400">
                    <Link weight="bold" />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-500 ml-2 hover:bg-red-400 cursor-pointer">
                    <Trash weight="bold" />
                </button>
            </div>
        </div>
    );
};

export default TrackOverview;
