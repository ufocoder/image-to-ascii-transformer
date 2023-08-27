type ImagePreset = {
    title: string;
    src: string;
}

const ImagePresets: ImagePreset[] = [
    {
        title: 'Cat 48x48',
        src: '/cat-48.png',
    },
    {
        title: 'Cat 256x256',
        src: '/cat-256.png'
    },
    {
        title: 'Animated hourse',
        src: '/animated'
    }  
];

interface UploadPresetProps {
    onLoad: (image: HTMLImageElement) => void
}

export default function UploadPreset({ onLoad }: UploadPresetProps) {
    const selectPreset = (src: string) => {
        const imageElement = new Image();

        imageElement.onload = () => onLoad(imageElement);
        imageElement.src = src;
    };

    return (
        <ul>
            {ImagePresets.map(({ title, src}) => (
                <li>
                    <a href="#" onClick={() => selectPreset(src)}>
                        {title}
                    </a>
                </li>
            ))}
        </ul>
    )
}