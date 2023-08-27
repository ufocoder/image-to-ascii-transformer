

type LoadCallback = (image: HTMLImageElement) => void

const getImageFileData = (file: File, cb: LoadCallback) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
        const imageElement = new Image();
        const buffer = fileReader.result as string;

        imageElement.onload = () => {
            cb(imageElement);
        }

        imageElement.src = buffer;
    };

    fileReader.readAsDataURL(file);
};

interface UploadFormProps {
    onLoad: LoadCallback
}

export default function UploadForm({ onLoad }: UploadFormProps) {
    const handleFileChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (!target.files) {
            return
        }
        getImageFileData(target.files[0], onLoad)
    }

    return (
        <form>
            <input type="file" accept="image/*" onChange={handleFileChange} />
        </form>
    )
}