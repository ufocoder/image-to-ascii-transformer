import { Show, Accessor, createSignal, createEffect } from "solid-js";
import Canvas from "./Canvas";
import Text from "./Text";
import { convertImageToLetters, prepareImageLettersData, prepareImageScaledData } from "@lib/target";
import TargetControls from "./TargetControls";

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

    // element = new canvas from canvas scale
    const letters = convertImageToLetters(props.settings, width, height, imageData);

    setLetters(letters);
  });

  return (
    <>
      <TargetControls target={target} onChange={setTarget} />
      <Show when={letters().length}>
        <Show when={target() === "canvas"}>
          <Canvas settings={props.settings} letters={letters} />
        </Show>
        <Show when={target() === "textarea"}>
          <Text settings={props.settings} letters={letters} />
        </Show>
      </Show>
    </>
  );
}
