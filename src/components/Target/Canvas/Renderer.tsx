import { Accessor, Setter, createEffect, createSignal, onCleanup } from "solid-js";
import { drawLetters } from "@app/lib/canvas";
import { createAnimation } from "@app/lib/animate";
import { LetterFrame } from "../types";

interface RendererProps {
  ref: Accessor<HTMLCanvasElement | undefined>;
  setRef: Setter<HTMLCanvasElement | undefined>;
  frames: Accessor<LetterFrame[]>
  settings: Settings;
}

export default function Renderer(props: RendererProps) {
  const [letters, setLetters] = createSignal<Letter[][]>([]);

  let stopAnimation: () => void;

  createEffect(() => {
    const frames = props.frames();

    if (stopAnimation) {
      stopAnimation();
    }

    if (frames.length > 1) {
      
      const { start, stop } = createAnimation(frames, setLetters);

      start();

      stopAnimation = stop;

      return;
    }

    if (frames.length === 1) {
      setLetters(frames[0].letters)
    }
  });

  onCleanup(() => {
    if (stopAnimation) {
      stopAnimation();
    }
  })

  createEffect(() => {
    if (!props.ref() || !letters().length) {
      return;
    }

    const ratio = props.settings.textSize;
    const height = letters()[0].length;
    const width = letters().length;

    props.ref()!.height = height * ratio;
    props.ref()!.width = width * ratio;

    const context = props.ref()!.getContext("2d");

    if (!context) {
      return;
    }

    drawLetters(context, props.settings, letters());
  });

  return <canvas ref={props.setRef} width="256" height="256" />;
}
