import { Show, Accessor, createSignal, createEffect } from "solid-js";
import Controls from "../Controls";
import Canvas from "./Canvas";
import Textarea from "./Textarea";
import generateLetters from "./generator";

interface TargetProps {
  imageContainer: Accessor<ImageContainer | undefined>;
  settings: Settings;
}

export default function Target(props: TargetProps) {
  const [letters, setLetters] = createSignal<Letter[][]>([]);
  const [target, setTarget] = createSignal<Target>("canvas");

  createEffect(async () => {
    const container = props.imageContainer();

    if (!container) {
      return;
    }

    await generateLetters(container, props.settings, setLetters)
  });

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
