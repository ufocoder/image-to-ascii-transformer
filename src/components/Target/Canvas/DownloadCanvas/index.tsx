import { Accessor } from "solid-js";
import { createHref } from "@app/lib/target";

interface DownloadCanvasProps {
  canvas: Accessor<HTMLCanvasElement | undefined>;
}

export default function DownloadCanvas(props: DownloadCanvasProps) {
  let link: HTMLAnchorElement | undefined;

  return (
    <div>
      <a
        ref={link}
        href="#"
        download="image-from-canvas.png"
        onClick={() => {
          link && (link.href = createHref(props.canvas()));
        }}
      >
        Download image from canvas
      </a>
    </div>
  );
}
