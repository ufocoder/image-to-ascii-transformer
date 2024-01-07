import UploadForm from "./Form";
import UploadPreset from "./Preset";
import { LoadCallback } from "./types";

interface UploadProps {
    onLoad: LoadCallback
}

export default function Upload(props: UploadProps) {
    return (
        <div>
            <h3>Upload image</h3>
            <UploadForm onLoad={props.onLoad} />

            <h3>Image presets</h3>
            <UploadPreset onLoad={props.onLoad} />
        </div>
    );
}