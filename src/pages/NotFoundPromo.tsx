import { X } from '@phosphor-icons/react';

const NotFoundPromo = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl md:text-3xl font-bold text-left md:w-xl lg:w-3xl">
                Sorry, the promo isn't available anymore :(
            </h1>
            <div className=" bg-zinc-900 md:w-xl lg:w-3xl rounded-lg mt-4 p-6 flex gap-x-8">
                <div className="w-48 h-48 relative flex items-center justify-center bg-zinc-950 rounded-lg">
                    <X className="text-zinc-700" size={72} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-lg font-semibold bg-zinc-700 h-5 w-30 rounded-md"></div>
                            <div className="text-lg font-semibold bg-zinc-700 mt-2 h-8 w-72 rounded-md"></div>
                            <div className="flex">
                                <div className="mr-2 mt-2 bg-zinc-800 px-2 h-4 w-16 rounded-full"></div>
                                <div className="mr-2 mt-2 bg-zinc-800 px-2 h-4 w-16 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="w-full h-16 bg-zinc-800 rounded-md" />
                    </div>
                    <div className="flex-1 mt-2 float-end bg-zinc-800 h-4 w-20 rounded-md"></div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPromo;
