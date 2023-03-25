type LoadCallback = (image: HTMLImageElement) => void


const PresetImageMap = {
    cat48: '/cat-48.png',
    cat256: '/cat-256.png'
}

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

export default function UploadForm(props: UploadFormProps) {
    const handleFileChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (!target.files) {
            return
        }
        getImageFileData(target.files[0], props.onLoad)
    }

    const createPresetClickHandler = (src: string) => () => {
        const imageElement = new Image();

        imageElement.onload = () => props.onLoad(imageElement);
        imageElement.src = src;
    };

    return (
        <>
            <form>
                <input type="file" accept="image/*" onChange={handleFileChange} />
            </form>

            <div class="mt-4">
                <h3>
                    Use default image
                </h3>
                <ul>
                    <li>
                        <a href="#" onClick={createPresetClickHandler(PresetImageMap.cat48)}>
                            cat-48
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={createPresetClickHandler(PresetImageMap.cat256)}>
                            cat-256
                        </a>
                    </li>
                </ul>
            </div>
         </>
    );
}
  