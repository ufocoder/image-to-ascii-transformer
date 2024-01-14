import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";
import { createAnimation } from "@app/lib/animate";
import { drawLetters } from "./lib";

interface RendererProps {
  frames: Accessor<LetterFrame[]>
  settings: Settings;
}

export default function Renderer(props: RendererProps) {
  const [ref, setRef] = createSignal<HTMLCanvasElement | undefined>();
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
    if (!ref() || !letters().length) {
      return;
    }

    const ratio = props.settings.textSize;
    const height = letters()[0].length;
    const width = letters().length;

    ref()!.height = height * ratio;
    ref()!.width = width * ratio;

    const context = ref()!.getContext("2d");

    if (!context) {
      return;
    }

    drawLetters(context, props.settings, letters());
  });

  return <canvas ref={setRef} style={{ ['max-width']: '100%' }} />;
}
