import { PromoType } from './PromoType';

export interface TrackType {
    id: string;
    title: string;
    artists: string;
    mix: string;
    tags: string[];
    album: string;
    albumCover: string;
    duration: number;
    url: string;
    promos: PromoType[];
}
