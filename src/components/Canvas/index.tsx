import { Accessor, createEffect, createSignal } from "solid-js";
import { drawFrame, extractImageData } from "./lib";

interface CanvasProps {
  image: Accessor<HTMLImageElement | undefined>;
  settings: Accessor<Settings>;
}

export default function Canvas(props: CanvasProps) {
  const [pixels, setPixels] = createSignal<Uint8ClampedArray>();

  let canvas: HTMLCanvasElement | undefined;

  createEffect(() => {
    const element = props.image();

    if (!element) {
      return;
    }

    setPixels(extractImageData(element));
  });

  createEffect(() => {
    if (!canvas) {
      return;
    }

    const ratio = props.settings().textSize;
    const height = props.image()?.height ?? 0;
    const width = props.image()?.width ?? 0;

    canvas.height = height * ratio;
    canvas.width = width * ratio;
  });

  createEffect(() => {
    const element = props.image();
    const imageData = pixels();

    if (!canvas || !element || !imageData) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    drawFrame(context, props.settings(), element, imageData);
  });

  return <canvas ref={canvas} width="256" height="256" />;
}
