import { Accessor, createSignal } from "solid-js";

interface DownloadCanvasProps {
  ref: Accessor<HTMLCanvasElement | undefined>
}

export default function DownloadCanvas(props: DownloadCanvasProps) {
  const [href, setHref] = createSignal<string | undefined>('#');

  const handleClick = () => {
    if (!props.ref()) {
      return
    }

    setHref(props.ref()?.toDataURL());
  };


  return (
    <div>
      <a
        href={href()}
        onClick={handleClick}
        download="image-from-canvas.png"
      >
        Download
      </a>
    </div>
  );
}
