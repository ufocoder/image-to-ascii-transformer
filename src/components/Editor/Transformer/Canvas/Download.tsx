import { Accessor, createSignal } from "solid-js";
import { createProcessingCanvas, getProcessingContext, processingCanvasToBlob } from "@app/lib/canvas";
import { drawLetters } from "./lib";
import { encodeGif } from "./gif";

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
  const [isPreparing, setIsPreparing] = createSignal(false);

  const downloadBlob = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    // @ts-expect-error @TODO: fix mime typings
    link.download = `image-from-canvas.${ext[props.mime]}`;
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const createStaticImage = (frame: LetterFrame) => {
    const ratio = props.settings.textSize;
    const height = frame.letters[0].length;
    const width = frame.letters.length;
    const canvas = createProcessingCanvas(width * ratio, height * ratio);
    const context = getProcessingContext(canvas)!;

    drawLetters(context, props.settings, frame.letters);

    return processingCanvasToBlob(canvas, props.mime);
  };

  const handleClick = async () => {
    const frames = props.frames()

    if (!frames || !frames.length) {
      return
    }

    setIsPreparing(true);
    await new Promise(requestAnimationFrame);

    try {
      const blob = props.mime === "image/gif"
        ? encodeGif(frames, props.settings)
        : await createStaticImage(frames[0]);

      downloadBlob(blob);
    } finally {
      setIsPreparing(false);
    }
  };


  return (
    <div class="text-center mt-4">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPreparing()}
        class="px-3 py-2 text-xs font-medium text-center text-white no-underline bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        {isPreparing() ? "Preparing..." : "Download"}
      </button>
    </div>
  );
}
