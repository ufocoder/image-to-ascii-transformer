import UploadForm from "./Form";
import UploadPreset from "./Preset";

interface UploadProps {
    onLoad: (image: HTMLImageElement) => void
}

export default function Upload({ onLoad }: UploadProps) {
    return (
        <div>
            <h3>Upload image</h3>
            <UploadForm onLoad={onLoad} />

            <h3>Image presets</h3>
            <UploadPreset onLoad={onLoad} />
        </div>
    );
}