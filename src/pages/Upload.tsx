import { useNavigation } from "@contexts/NavigationContext";

const Upload = () => {
    const { setCurrentScreen } = useNavigation();
    return (
        <div>
                <h1>Upload</h1>
                <button onClick={() => setCurrentScreen('player')}>Go to Player</button>
        </div>
        );
        }

export default Upload;