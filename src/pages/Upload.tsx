import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { Image, UploadSimple, X } from "@phosphor-icons/react";
import { useNavigation } from "@contexts/NavigationContext";
import Loading from "@components/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UploadFormData {
    title: string;
    artists: string;
    tags: string;
}

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [artworkFile, setArtworkFile] = useState<File | null>(null);
    const [showForm, setShowForm] = useState(false);
    const { register, handleSubmit } = useForm<UploadFormData>();
    const { setCurrentScreen } = useNavigation();

    const onDropTrackFile = (acceptedFiles: File[], rejectedFiles: any[]) => {
        if (rejectedFiles.length > 0) {
            toast.error('Please upload only .mp3 or .wav files', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        const file = acceptedFiles[0];
        setUploadedFile(file);
        setShowForm(true);
    };

    const onDropArtwork = (acceptedFiles: File[], rejectedFiles: any[]) => {
        if (rejectedFiles.length > 0) {
            toast.error('Please upload only .jpg, .jpeg or .png files', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        const file = acceptedFiles[0];
        setArtworkFile(file);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDropTrackFile,
        accept: {
            'audio/mpeg': ['.mp3'],
            'audio/wav': ['.wav']
        },
        maxFiles: 1
    });

    const { 
        getRootProps: getArtworkRootProps, 
        getInputProps: getArtworkInputProps,
        isDragActive: isArtworkDragActive 
    } = useDropzone({
        onDrop: onDropArtwork,
        accept: {
            'image/*': ['.jpg', '.jpeg', '.png']
        },
        maxFiles: 1
    });

    const onSubmit = async (data: UploadFormData) => {
        setIsLoading(true);
        try {
            // TODO: Implement the logic to send the data to the backend
            console.log({ ...data, trackFile: uploadedFile, artworkFile: artworkFile });
            setCurrentScreen('promos');
        } catch (error) {
            console.error('Error uploading:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const removeFile = () => {
        setUploadedFile(null);
        setShowForm(false);
    };

    return (
        <div className="flex flex-col h-screen">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Loading isLoading={isLoading} />
            <div className="flex-1 flex items-center justify-center p-12">
                <div className="w-full max-w-4xl flex flex-col">
                    <h1 className="text-2xl md:text-3xl font-bold mb-8">
                        Upload a Promo
                    </h1>

                    {!showForm ? (
                        <div className="flex flex-col items-center justify-center">
                            <div
                                {...getRootProps()}
                                className={`w-full h-100 flex items-center justify-center rounded-lg p-12 cursor-pointer border border-zinc-800 transition-colors ${
                                    isDragActive 
                                        ? 'bg-zinc-600 border-zinc-600' 
                                        : 'bg-zinc-800 hover:border-zinc-600'
                                }`}
                            >
                                <input {...getInputProps()} />
                                <div className="flex flex-col items-center justify-center gap-4 font-bold">
                                    <UploadSimple size={48} className="text-zinc-400" />
                                    <p className="text-zinc-400">
                                        Drag and drop your track file here
                                    </p>
                                    <p className="text-zinc-400">
                                        .mp3 or .wav only
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-zinc-900 rounded-xl p-8">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex gap-8">
                                    <div className="flex flex-col gap-4">
                                        <div
                                            {...getArtworkRootProps()}
                                            className={`w-64 h-64 flex items-center justify-center rounded-lg cursor-pointer border border-zinc-800 transition-colors ${
                                                isArtworkDragActive 
                                                    ? 'bg-zinc-600 border-zinc-600' 
                                                    : 'bg-zinc-800 hover:border-zinc-600'
                                            }`}
                                        >
                                            <input {...getArtworkInputProps()} />
                                            {artworkFile ? (
                                                <img
                                                    src={URL.createObjectURL(artworkFile)}
                                                    alt="Artwork"
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center gap-2 p-4">
                                                    <Image size={100} className="text-zinc-400" weight="thin"/>
                                                    <p className="text-zinc-400 text-center text-sm">
                                                        Drag and Drop track's artwork
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-zinc-400 text-sm text-center">
                                            Recommended size: 1000x1000px
                                        </span>
                                    </div>

                                    <div className="flex-1 flex flex-col gap-4">
                                        <div>
                                            <span className="text-zinc-200">Title</span>
                                            <div className="flex items-center p-3 bg-zinc-700 rounded-lg mt-2">
                                                <input
                                                    {...register("title", { required: true })}
                                                    placeholder="Title of the track"
                                                    className="w-full bg-transparent text-zinc-100 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-zinc-200">Artists</span>
                                            <div className="flex items-center p-3 bg-zinc-700 rounded-lg mt-2">
                                                <input
                                                    {...register("artists", { required: true })}
                                                    placeholder="Artists"
                                                    className="w-full bg-transparent text-zinc-100 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-zinc-200">Tags</span>
                                            <div className="flex items-center p-3 bg-zinc-700 rounded-lg mt-2">
                                                <input
                                                    {...register("tags", { required: true })}
                                                    placeholder="Tag track's genre or any tag you want"
                                                    className="w-full bg-transparent text-zinc-100 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-zinc-200">Track file</span>
                                            <div className="flex items-center justify-between p-3 bg-zinc-700 rounded-lg mt-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm text-zinc-400">{uploadedFile?.name}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={removeFile}
                                                    className="text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-4 mt-4">
                                            <button
                                                type="button"
                                                onClick={() => setCurrentScreen('promos')}
                                                className="px-3 py-2 border border-zinc-500 text-zinc-500 rounded-lg hover:bg-red-500 hover:text-zinc-100 hover:border-red-500 transition-colors cursor-pointer"
                                            >
                                                Discard
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-3 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors cursor-pointer"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Upload;