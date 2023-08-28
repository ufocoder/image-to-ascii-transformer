import { For } from "solid-js";

type ImagePreset = {
    title: string;
    src: string;
}

const ImagePresets: ImagePreset[] = [
    {
        title: 'Cat 48x48',
        src: import.meta.env.BASE_URL + '/cat-48.png',
    },
    {
        title: 'Cat 256x256',
        src: import.meta.env.BASE_URL + '/cat-256.png'
    },
    {
        title: 'Animated hourse',
        src: import.meta.env.BASE_URL + '/animated.gif'
    }  
];

interface UploadPresetProps {
    onLoad: (image: HTMLImageElement) => void
}

export default function UploadPreset(props: UploadPresetProps) {
    const selectPreset = (src: string) => {
        const imageElement = new Image();

        imageElement.onload = () => props.onLoad(imageElement);
        imageElement.src = src;
    };

    return (
        <ul>
            <For each={ImagePresets}>{({ title, src}) => (
                <li>
                    <a href="#" onClick={() => selectPreset(src)}>
                        {title}
                    </a>
                </li>
            )}</For>
        </ul>
    )
}