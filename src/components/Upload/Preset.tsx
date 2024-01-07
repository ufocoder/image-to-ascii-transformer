import { For } from "solid-js";
import { LoadCallback } from "./types";

type ImagePreset = {
    title: string;
    src: string;
}

const ImagePresets: ImagePreset[] = [
    {
        title: 'JPEG: Cat',
        src: import.meta.env.BASE_URL + '/cat.jpg',
    },
    {
        title: 'PNG: Cat 48x48',
        src: import.meta.env.BASE_URL + '/cat-48.png',
    },
    {
        title: 'PNG: Cat 256x256',
        src: import.meta.env.BASE_URL + '/cat-256.png'
    },
    {
        title: 'GIF: Animated cat',
        src: import.meta.env.BASE_URL + '/n-frames-2.gif'
    },
    {
        title: 'GIF: Animated hourse',
        src: import.meta.env.BASE_URL + '/n-frames-1.gif'
    },
    {
        title: 'GIF: Not animated hourses',
        src: import.meta.env.BASE_URL + '/1-frame.gif'
    }  
];

interface UploadPresetProps {
    onLoad: LoadCallback
}

export default function UploadPreset(props: UploadPresetProps) {
    const selectPreset = async (src: string) => {
        const response = await fetch(src)
        const arrayBuffer = await response.arrayBuffer();

        const element = new Image();
        
        element.onload = () => {
            props.onLoad({
                element,
                buffer: arrayBuffer
            });
        };

        element.src = src;
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