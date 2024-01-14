import UploadForm from "./Form";
import UploadPreset from "./Preset";
import { LoadCallback } from "./types";

interface UploadProps {
  onLoad: LoadCallback
}

export default function Upload(props: UploadProps) {
  return (
    <div class="max-w-3xl mx-auto">
      <div class="mb-4">
        <UploadForm onLoad={props.onLoad} />
      </div>
      <p class="text-base text-center my-4">
        Or you can use one of the preset images 
      </p>
      <div>
        <UploadPreset onLoad={props.onLoad} />
      </div>
    </div>
  );
}