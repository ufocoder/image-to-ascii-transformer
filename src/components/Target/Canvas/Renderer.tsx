import { Accessor, Setter, createEffect } from "solid-js";
import { drawLetters } from "@app/lib/canvas";

interface RendererProps {
  ref: Accessor<HTMLCanvasElement | undefined>;
  setRef: Setter<HTMLCanvasElement | undefined>;
  letters: Accessor<Letter[][]>;
  settings: Settings;
}

export default function Renderer(props: RendererProps) {
  createEffect(() => {
    if (!props.ref() || !props.letters().length) {
      return;
    }

    const ratio = props.settings.textSize;
    const height = props.letters()[0].length;
    const width = props.letters().length;

    props.ref()!.height = height * ratio;
    props.ref()!.width = width * ratio;

    const context = props.ref()!.getContext("2d");

    if (!context) {
      return;
    }

    drawLetters(context, props.settings, props.letters());
  });

  return <canvas ref={props.setRef} width="256" height="256" />;
}
