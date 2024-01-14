import { Accessor, createSignal } from "solid-js";

interface DownloadCanvasProps {
  frames: Accessor<LetterFrame[]>;
}

export default function DownloadCanvas(props: DownloadCanvasProps) {
  const [href, setHref] = createSignal<string | undefined>('#');

  const handleClick = () => {
    if (!props.frames()) {
      return
    }

    setHref('');
  };


  return (
    <div>
      <a
        href={href()}
        onClick={handleClick}
        download="image-from-canvas.png"
        class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Download
      </a>
    </div>
  );
}
