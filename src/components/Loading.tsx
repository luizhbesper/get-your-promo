import { Spinner } from "@phosphor-icons/react";

interface LoadingProps {
    isLoading: boolean;
}

const Loading = ({ isLoading }: LoadingProps) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-zinc-950/50 flex items-center justify-center z-50">
            <div className="p-8 rounded-lg flex flex-col items-center gap-4">
                <Spinner size={64} className="text-cyan-500 animate-spin" />
            </div>
        </div>
    );
};

export default Loading; 