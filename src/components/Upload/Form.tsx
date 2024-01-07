import { LoadCallback } from "./types";

const getImageFileData = async (file: File, cb: LoadCallback) => {
    const fileReader = new FileReader();
    const arrayBuffer = await file.arrayBuffer()

    fileReader.onload = async () => {
        const element = new Image();
        const dataURL = fileReader.result as string;
        
        element.onload = () => {
            cb({
                element,
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
    const handleFileChange = async (e: Event) => {
        const target = e.target as HTMLInputElement;

        if (!target.files) {
            return
        }

        getImageFileData(target.files[0], props.onLoad)
    }

    return (
        <form>
            <input type="file" accept="image/*" onChange={handleFileChange} />
        </form>
    )
}