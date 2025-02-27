// src/api/tracks.ts
import { TrackType } from '../types/TrackType';

export const tracks: TrackType[] = [
    {
        id: 'bb255d3a-1010-4310-90f0-83e3879d0138', // Simulated UUID8 for the track
        title: 'Revelations',
        artists: 'Acrobatik, Alka',
        mix: 'Original Mix',
        tags: ['melodic techno', 'released'],
        album: 'Ame Records',
        albumCover: 'src/assets/img/artwork.png',
        duration: 240,
        url: 'src/assets/music/Revelations.wav',
        promos: [
            {
                id: '2197fe22-8760-44d5-9c8d-761100dfb6bd', // Simulated UUID8 for the promo
                receiver: 'Camelphat',
                views: 1,
                plays: 0,
                downloads: 0,
                lastActivity: '2023-10-01T12:00:00Z',
            },
            {
                id: 'd232b0f6-3b9a-4b54-bcf8-540611d249b4',
                receiver: 'Vintage Culture',
                views: 2,
                plays: 1,
                downloads: 1,
                lastActivity: '2023-10-02T12:00:00Z',
            },
        ],
    },
    {
        id: '99e46e69-5a4b-430b-9a2e-4c5aa8b211a4', // Simulated UUID8 for the track
        title: 'ID',
        artists: 'Moonphazes, Alka',
        mix: 'Original Mix',
        tags: ['melodic techno', 'unreleased'],
        album: 'Promos',
        albumCover: 'src/assets/img/euphoria.png',
        duration: 300,
        url: 'src/assets/music/Euphoria.wav',
        promos: [
            {
                id: 'ced29846-b6b6-4e56-bbe3-e2107598e1ab', // Simulated UUID8 for the promo
                receiver: 'Kevin De Vries',
                views: 0,
                plays: 0,
                downloads: 0,
                lastActivity: '2023-10-03T12:00:00Z',
            },
            {
                id: '76667b10-c3d4-411c-bf01-3e6a0512c033', // Simulated UUID8 for the promo
                receiver: 'Kasia',
                views: 0,
                plays: 0,
                downloads: 1,
                lastActivity: '2023-10-03T12:00:00Z',
            },
        ],
    },
];
