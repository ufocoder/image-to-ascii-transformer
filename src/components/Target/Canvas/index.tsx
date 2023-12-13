import { Accessor, createEffect } from "solid-js";
import { drawLetters } from "@lib/canvas";

interface CanvasProps {
  letters: Accessor<Letter[][]>;
  settings: Settings;
}

export default function Canvas(props: CanvasProps) {
  let canvas: HTMLCanvasElement | undefined;

  createEffect(() => {
    if (!canvas || !props.letters().length) {
      return;
    }

    const ratio = props.settings.textSize;
    const height = props.letters()[0].length;
    const width = props.letters().length;

    canvas.height = height * ratio;
    canvas.width = width * ratio;

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    drawLetters(context, props.settings, props.letters());
  });

  return <canvas ref={canvas} width="256" height="256" />;
}
