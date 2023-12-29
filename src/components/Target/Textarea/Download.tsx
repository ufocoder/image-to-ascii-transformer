import { Accessor, createSignal } from "solid-js";

interface DownloadCanvasProps {
  ref: Accessor<HTMLTextAreaElement | undefined>;
}

export default function DownloadCanvas(props: DownloadCanvasProps) {
  const [href, setHref] = createSignal<string | undefined>('#');

  const handleClick = () => {
    if (!props.ref()) {
      return
    }

    const blob = new Blob([props.ref()!.value!], { type: "text/plain" });

    setHref(URL.createObjectURL(blob));
  };

  return (
    <div>
      <a
        href={href()}
        onClick={handleClick}
        download="image-from-textarea.txt"
      >
        Download
      </a>
    </div>
  );
}
