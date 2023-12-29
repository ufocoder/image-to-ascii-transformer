import { Show, Accessor, createSignal, createEffect } from "solid-js";
import { convertImageToLetters, prepareImageLettersData, prepareImageScaledData } from "@app/lib/target";
import Controls from "../Controls";
import Canvas from "./Canvas";
import Textarea from "./Textarea";

interface TargetProps {
  image: Accessor<HTMLImageElement | undefined>;
  settings: Settings;
}

export default function Target(props: TargetProps) {
  const [letters, setLetters] = createSignal<Letter[][]>([]);
  const [target, setTarget] = createSignal<Target>("canvas");

  createEffect(() => {
    const element = props.image();

    if (!element) {
      return;
    }

    const { width, height, imageData } =
      props.settings.scale == "same-size"
        ? prepareImageScaledData(element, props.settings)
        : prepareImageLettersData(element);

    const letters = convertImageToLetters(props.settings, width, height, imageData);

    setLetters(letters);
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
