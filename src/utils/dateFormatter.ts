import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { PromoType } from '../types/PromoType';

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

/**
 * Returns the relative time string (e.g., "2 days ago") of the most recent promo activity.
 *
 * @param promos - An array of PromoType objects.
 * @returns A relative time string representing how long ago the most recent activity occurred,
 *          or 'No recent activity' if the array is empty.
 */
export const getMostRecentActivity = (promos: PromoType[]): string => {
    if (promos.length === 0) return 'No recent activity';

    let mostRecent: PromoType = promos[0];

    promos.forEach((promo) => {
        if (dayjs(promo.lastActivity).isAfter(dayjs(mostRecent.lastActivity))) {
            mostRecent = promo;
        }
    });

    return dayjs(mostRecent.lastActivity).fromNow();
};
