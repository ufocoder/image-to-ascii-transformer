import { SUPPORT_EXTENSIONS } from "@app/constants";
import { LoadCallback } from "./types";
import { getMimeType } from "@app/lib/mime";

const getImageFileData = async (file: File, cb: LoadCallback) => {
  const fileReader = new FileReader();
  const arrayBuffer = await file.arrayBuffer()

  fileReader.onload = async () => {
    const element = new Image();
    const dataURL = fileReader.result as string;
    const mime = await getMimeType(new Blob([arrayBuffer]));

    element.onload = () => {
      cb({
        element,
        mime,
        buffer: arrayBuffer,
      });
    }

    element.src = dataURL;
  };

  fileReader.readAsDataURL(file);
};

interface UploadFormProps {
  onLoad: LoadCallback
}

export default function UploadForm(props: UploadFormProps) {
  const handleDropFile = async (e: DragEvent) => {
    if (e.dataTransfer?.files) {
      getImageFileData(e.dataTransfer.files[0], props.onLoad);
    }
  }

  const handleFileChange = async (e: Event) => {
    const target = e.target as HTMLInputElement;

    if (!target.files) {
      return;
    }

    getImageFileData(target.files[0], props.onLoad);
  }

  return (
    <form>
      <div class="flex items-center justify-center w-full">
        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border border-black border-dashed rounded-lg cursor-pointer bg-gray-50">
          <div class="flex flex-col items-center justify-center pt-5 pb-6" onDrop={handleDropFile}>
            <svg class="w-16 h-16 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="text-m text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-sm text-gray-500">{SUPPORT_EXTENSIONS.map(s => s.toUpperCase()).join(', ')}</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>
    </form>
  )
}