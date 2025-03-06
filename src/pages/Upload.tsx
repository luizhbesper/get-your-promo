import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { Image, UploadSimple, X } from "@phosphor-icons/react";
import { useNavigation } from "@contexts/NavigationContext";

interface UploadFormData {
    title: string;
    artists: string;
    tags: string;
}

const Upload = () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [artworkFile, setArtworkFile] = useState<File | null>(null);
    const [showForm, setShowForm] = useState(false);
    const { register, handleSubmit } = useForm<UploadFormData>();
    const { setCurrentScreen } = useNavigation();

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setUploadedFile(file);
        setShowForm(false);
        
        setUploadProgress(0);
        const startTime = Date.now();
        const duration = 2000; 

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / duration) * 100, 100);
            
            setUploadProgress(progress);
            
            //TODO: Change progress bar to show the upload progress
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setShowForm(true);
                }, 200); 
            }
        }, 16); 
    };

    const onDropArtwork = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setArtworkFile(file);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
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

    const onSubmit = (data: UploadFormData) => {
        console.log({ ...data, file: uploadedFile });
        // TODO: Implement the logic to send the data to the backend
    };

    const removeFile = () => {
        setUploadedFile(null);
        setUploadProgress(0);
        setShowForm(false);
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="p-12">
                <h1 className="text-2xl md:text-3xl font-bold text-left md:w-xl lg:w-3xl">
                    Upload a Promo
                </h1>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <div className="w-full flex items-center justify-center"> 
                    {!showForm ? (
                        <div className="flex flex-col w-2xl items-center justify-center">
                            <div
                                {...getRootProps()}
                                className={`w-2xl h-100 flex items-center justify-center rounded-lg rounded-b-none p-12 cursor-pointer border border-zinc-800 transition-colors ${
                                    isDragActive 
                                        ? 'bg-zinc-600 border-zinc-600' 
                                        : 'bg-zinc-800 hover:border-zinc-600'
                                }`}
                            >
                                <input {...getInputProps()} />
                                <div className="flex flex-col items-center justify-center gap-4 font-bold">
                                    <UploadSimple size={48} className="text-gray-400" />
                                    <p className="text-zinc-400">
                                        Drag and drop your track file here
                                    </p>
                                    <p className="text-zinc-400">
                                        .mp3 or .wav only
                                    </p>
                                </div>
                            </div>

                            <div className="w-2xl h-2 bg-zinc-200 rounded-b-lg">
                                <div
                                    className="h-full bg-cyan-500 transition-all duration-200"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl p-8">
                            <div className="flex gap-8">
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
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Image size={100} className="text-zinc-400" weight="thin"/>
                                            <p className="text-zinc-400 text-center">Drag and Drop track's artwork</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col gap-4 w-120">
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default Upload;