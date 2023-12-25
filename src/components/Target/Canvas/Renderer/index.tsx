import { Accessor, Setter, createEffect } from "solid-js";
import { drawLetters } from "@app/lib/canvas";

interface RendererProps {
  canvas: Accessor<HTMLCanvasElement | undefined>;
  letters: Accessor<Letter[][]>;
  settings: Settings;
  setCanvas: Setter<HTMLCanvasElement | undefined>;
}

export default function Renderer(props: RendererProps) {
  createEffect(() => {
    if (!props.canvas() || !props.letters().length) {
      return;
    }

    const ratio = props.settings.textSize;
    const height = props.letters()[0].length;
    const width = props.letters().length;

    props.canvas()!.height = height * ratio;
    props.canvas()!.width = width * ratio;

    const context = props.canvas()!.getContext("2d");

    if (!context) {
      return;
    }

    drawLetters(context, props.settings, props.letters());
  });

  return <canvas ref={(el) => props.setCanvas(el)} width="256" height="256" />;
}
