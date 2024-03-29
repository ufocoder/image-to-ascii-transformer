import { Accessor, Show, createSignal } from "solid-js";
import { getText } from "./lib";

interface DownloadCanvasProps {
  frames: Accessor<LetterFrame[]>
}

export default function DownloadCanvas(props: DownloadCanvasProps) {
  const [href, setHref] = createSignal<string | undefined>('#');

  const handleClick = () => {
    const frames = props.frames()
    
    if (!frames || !frames.length) {
      return
    }

    const text = getText(frames[0].letters);
    const blob = new Blob([text], { type: "text/plain" });

    setHref(URL.createObjectURL(blob));
  };

  return (
    <div class="text-center mt-4">
      <a
        href={href()}
        onClick={handleClick}
        download="image-from-textarea.txt"
        class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-30"
      >
        Download
      </a>
      <Show when={props.frames().length > 1}>
        <p class="text-xs px-2 inline italic">Only first frame</p>
      </Show>
    </div>
  );
}
