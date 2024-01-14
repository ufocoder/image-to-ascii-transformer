import { For } from "solid-js";
import { LoadCallback } from "./types";
import { getMimeType } from "@app/lib/mime";

type ImagePreset = {
    title: string;
    src: string;
    settings?: Optional<Settings>;
}

const ImagePresets: ImagePreset[] = [
    {
        title: 'Animated GIF: 300x400 ',
        src: import.meta.env.BASE_URL + '/animated-300-400.gif',
        settings: {
            textSize: 4,
            colored: true
        }
    },
    {
        title: 'GIF: 48x48',
        src: import.meta.env.BASE_URL + '/cat-48.gif',
        settings: {
            textSize: 2,
        }
    },
    {
        title: 'GIF: 512x512',
        src: import.meta.env.BASE_URL + '/cat-512.gif',
        settings: {
            textSize: 7,
            colored: true
        }
    },
    {
        title: 'PNG: 48x48',
        src: import.meta.env.BASE_URL + '/cat-48.png',
        settings: {
            textSize: 2,
        }
    },
    {
        title: 'PNG: 512x512',
        src: import.meta.env.BASE_URL + '/cat-512.png',
        settings: {
            textSize: 7,
            colored: true
        }
    },
    {
        title: 'JPEG: 225x225',
        src: import.meta.env.BASE_URL + '/woman-225.jpeg',
        settings: {
            textSize: 2,
            colored: true
        }
    },
];

interface UploadPresetProps {
    onLoad: LoadCallback
}

export default function UploadPreset(props: UploadPresetProps) {
    const selectPreset = async (src: string, settings?: Optional<Settings>) => {
        const response = await fetch(src)
        const arrayBuffer = await response.arrayBuffer();
        const mime = await getMimeType(new Blob([arrayBuffer]));

        const element = new Image();
        
        element.onload = () => {
            props.onLoad({
                mime,
                element,
                buffer: arrayBuffer
            }, settings);
        };

        element.src = src;
    };

    return (
        <div class="flex flex-row gap-x-2 gap-y-2 flex-wrap justify-center">
            <For each={ImagePresets}>{({ title, src, settings }) => (
                <button 
                    type="button" 
                    onClick={() => selectPreset(src, settings)}
                    class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                    {title}
                </button>
            )}</For>
        </div>
    )
}