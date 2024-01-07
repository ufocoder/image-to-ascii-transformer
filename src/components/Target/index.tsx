import { Show, Accessor, createSignal, createEffect, onCleanup } from "solid-js";
import Controls from "../Controls";
import Canvas from "./Canvas";
import Textarea from "./Textarea";
import generateLetters from "./generator";
import { createAnimation } from "@app/lib/animate";
import { LetterFrame } from "./types";
interface TargetProps {
  imageContainer: Accessor<ImageContainer | undefined>;
  settings: Settings;
}

export default function Target(props: TargetProps) {
  const [letters, setLetters] = createSignal<Letter[][]>([]);
  const [frames, setFrames] = createSignal<LetterFrame[]>([]);
  const [target, setTarget] = createSignal<Target>("canvas");

  let stopAnimation: () => void;

  createEffect(async () => {
    const container = props.imageContainer();

    if (!container) {
      return;
    }

    if (stopAnimation) {
      stopAnimation();
    }

    const letterFrames = await generateLetters(container, props.settings)

    if (letterFrames.length > 1) {
      setFrames(letterFrames);
      return;
    }

    if (letterFrames.length === 1) {
      setLetters(letterFrames[0].letters);
      return;
    }
  });

  createEffect(async () => {
    if (frames().length > 1) {
      const { start, stop } = createAnimation(frames(), setLetters);

      console.log('start');
      start();

      stopAnimation = stop;
    }
  });

  onCleanup(() => {
    if (stopAnimation) {
      stopAnimation();
    }
  })

  return (
    <>
      <Controls target={target} onChange={setTarget} />
      <Show when={letters().length}>
        <Show when={target() === "canvas"}>
          <Canvas settings={props.settings} letters={letters} />
        </Show>
        <Show when={target() === "textarea"}>
          <Textarea settings={props.settings} letters={letters} />
        </Show>
      </Show>
    </>
  );
}
