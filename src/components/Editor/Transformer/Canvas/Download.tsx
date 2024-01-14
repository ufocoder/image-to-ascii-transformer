import { Accessor, createSignal } from "solid-js";
import { drawLetters } from "./lib";

interface DownloadCanvasProps {
  settings: Settings;
  frames: Accessor<LetterFrame[]>
}

export default function DownloadCanvas(props: DownloadCanvasProps) {
  const [href, setHref] = createSignal<string | undefined>('#');

  const handleClick = () => {
    const frames = props.frames()

    if (!frames || !frames.length) {
      return
    }
    
    const frame = frames[0];
    const canvas = document.createElement("canvas");
    const context = canvas!.getContext("2d");
    // @TODO: pass width and height

    drawLetters(context!, props.settings, frame.letters);    
    setHref(canvas.toDataURL('image/png'));
  };


  return (
    <div class="text-center">
      <a
        href={href()}
        onClick={handleClick}
        download="image-from-canvas.png"
        class="px-3 py-2 text-xs font-medium text-center text-white no-underline bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Download
      </a>
    </div>
  );
}
