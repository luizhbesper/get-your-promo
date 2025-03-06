import React, { useState } from 'react';
import type { PromoType } from '@/types/PromoType';
import {
    Eye,
    CopySimple,
    Play,
    DownloadSimple,
    Trash,
    FloppyDisk,
    X,
} from '@phosphor-icons/react';
import { getMostRecentActivity } from '@utils/dateFormatter';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

type Inputs = {
    promoReceiver: string;
};

interface PromoOverviewProps {
    promo: PromoType;
}

const PromoOverview: React.FC<PromoOverviewProps> = ({ promo }) => {
    const { register, handleSubmit, reset } = useForm<Inputs>({
        defaultValues: { promoReceiver: promo.receiver },
    });

    const [saveEnabled, setSaveEnabled] = useState(false);
    const [copyTooltip, setCopyTooltip] = useState(false);
    const [receiver, setReceiver] = useState(promo.receiver);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setReceiver(data.promoReceiver);
        setSaveEnabled(false);
        //TODO: Implement a function to save the new receiver
    };

    const onChangeReceiver = () => {
        setSaveEnabled(true);
        //TODO: Implement a debounce function to avoid multiple calls
    };

    const deletePromo = () => {
        console.log('Deleting promo:', promo.id);
        //TODO: Implement a function to delete the promo
    };

    const copyToClipboard = () => {
        const promoLink = `https://getyourpromo.com/promo/${promo.id}`;
        navigator.clipboard
            .writeText(promoLink)
            .then(() => {
                setCopyTooltip(true);
                setTimeout(() => setCopyTooltip(false), 500);
            })
            .catch((err) => console.error('Failed to copy:', err));
    };

    const discardReceiverChange = () => {
        reset({ promoReceiver: receiver });
        setSaveEnabled(false);
    };

    return (
        <form
            className="flex items-center gap"
            onSubmit={handleSubmit(onSubmit)}
        >
            <input
                className="flex-1 rounded-lg bg-zinc-900 p-3 mr-20 text-zinc-400 focus:text-zinc-100"
                {...register('promoReceiver')}
                onChange={onChangeReceiver}
            />
            <div className="flex items-center">
                <div className="flex items-center gap-x-2 w-16">
                    <Eye className="text-zinc-300" size={18} weight="bold" />
                    <p className="text-zinc-300 font-semibold">{promo.views}</p>
                </div>
                <div className="flex items-center gap-x-2 w-16">
                    <Play className="text-zinc-300" size={18} weight="bold" />
                    <p className="text-zinc-300 font-semibold">{promo.plays}</p>
                </div>
                <div className="flex items-center gap-x-2 w-16">
                    <DownloadSimple
                        className="text-zinc-300"
                        size={18}
                        weight="bold"
                    />
                    <p className="text-zinc-300 font-semibold">
                        {promo.downloads}
                    </p>
                </div>
                <span className="text-sm font-regular w-60 text-zinc-300 text-center font-bold">
                    {'Last Activity: ' + getMostRecentActivity([promo])}
                </span>

                {saveEnabled && (
                    <button
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-500 cursor-pointer hover:bg-cyan-400"
                        type="submit"
                    >
                        <FloppyDisk weight="bold" />
                    </button>
                )}

                {saveEnabled ? (
                    <button
                        type="button"
                        onClick={discardReceiverChange}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-500 ml-2 hover:bg-red-400 cursor-pointer"
                    >
                        <X weight="bold" />
                    </button>
                ) : (
                    <>
                        <button
                            data-tooltip-id="copy-tooltip"
                            data-tooltip-content={'Copied to Clipboard!'}
                            type="button"
                            onClick={copyToClipboard}
                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-500 cursor-pointer hover:bg-cyan-400"
                        >
                            <CopySimple weight="bold" />
                        </button>
                        <button
                            type="button"
                            onClick={deletePromo}
                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-500 ml-2 hover:bg-red-400 cursor-pointer"
                        >
                            <Trash weight="bold" />
                        </button>
                    </>
                )}
            </div>
            <Tooltip id="copy-tooltip" place="top" isOpen={copyTooltip} />
        </form>
    );
};

export default PromoOverview;
