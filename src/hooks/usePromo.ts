import { promos } from '@/api/promos';
import type { PromoType } from '@/types/PromoType';

/**
 * Hook para gerenciar as promos.
 *
 * @returns Um objeto com funções para manipular as promos.
 */
const usePromo = () => {
    /**
     * Insert a new promo.
     *
     * @param promo - Promo to be inserted.
     */
    const insertPromo = (promo: PromoType) => {
        console.log('Inserting promo:', promo);
        promos.push(promo);
    };

    /**
     * Remove a promo by ID
     *
     * @param promoId - Promo ID to be removed.
     */
    const deletePromo = (promoId: string) => {
        console.log('Deleting promo:', promoId);
        const index = promos.findIndex(promo => promo.id === promoId);
        if (index !== -1) {
            promos.splice(index, 1);
        }
    };

    /**
     * Update the receiver of a promo.
     *
     * @param promoId - Promo ID to be updated.
     * @param receiver - New Receiber name to be updated.
     */
    const updatePromoReceiver = (promoId: string, receiver: string) => {
        console.log('Updating promo receiver:', promoId, receiver);
        const promo = promos.find(promo => promo.id === promoId);
        if (promo) {
            promo.receiver = receiver;
        }
    };


    return {
        insertPromo,
        deletePromo,
        updatePromoReceiver,
    };
};

export default usePromo; 