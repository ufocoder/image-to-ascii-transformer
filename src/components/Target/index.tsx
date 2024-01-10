import { Show, Accessor, createSignal, createEffect } from "solid-js";
import Controls from "../Controls";
import Canvas from "./Canvas";
import Textarea from "./Textarea";
import generateFrames from "./generator";
import { LetterFrame } from "./types";

interface TargetProps {
  imageContainer: Accessor<ImageContainer | undefined>;
  settings: Settings;
}

export default function Target(props: TargetProps) {
  const [frames, setFrames] = createSignal<LetterFrame[]>([]);
  const [target, setTarget] = createSignal<Target>("canvas");


  createEffect(() => {
    (async () => {
      const container = props.imageContainer();

      if (!container) {
        return;
      }

      const frames = await generateFrames(container, props.settings)

      console.log(frames);

      setFrames(frames);
    })();
  });

  return (
    <>
      <Controls target={target} onChange={setTarget} />
      <Show when={frames().length}>
        <Show when={target() === "canvas"}>
          <Canvas settings={props.settings} frames={frames} />
        </Show>
        <Show when={target() === "textarea"}>
          <Textarea settings={props.settings} frames={frames} />
        </Show>
      </Show>
    </>
  );
}
