import { Accessor, createSignal } from "solid-js";
import { drawLetters } from "./lib";

interface DownloadCanvasProps {
  mime: string;
  settings: Settings;
  frames: Accessor<LetterFrame[]>
}

const ext = {
  'image/gif': 'gif',
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
}

export default function DownloadCanvas(props: DownloadCanvasProps) {
  const [href, setHref] = createSignal<string | undefined>('#');

  const handleClick = () => {
    const frames = props.frames()

    if (!frames || !frames.length) {
      return
    }
    
    const frame = frames[0];
    
    const ratio = props.settings.textSize;
    const height = frame.letters[0].length;
    const width = frame.letters.length;
    
    const canvas = document.createElement("canvas");
    const context = canvas!.getContext("2d");

    canvas.height = height * ratio;
    canvas.width = width * ratio;
    
    drawLetters(context!, props.settings, frame.letters);    
    setHref(canvas.toDataURL(props.mime));
  };


  return (
    <div class="text-center mt-4">
      <a
        href={href()}
        onClick={handleClick}
        // @ts-expect-error @TODO: fix mime typings
        download={`image-from-canvas.${ext[props.mime]}`}
        class="px-3 py-2 text-xs font-medium text-center text-white no-underline bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Download
      </a>
    </div>
  );
}
