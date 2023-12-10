import { Show, Accessor, createSignal, createEffect } from "solid-js";
import Canvas from "./Canvas";
import Text from "./Text";
import { convertImageToLetters, extractImageData } from "./lib";
import TargetControls from "./TargetControls";

interface TargetProps {
  image: Accessor<HTMLImageElement | undefined>;
  settings: Settings;
}

function prepareImageScaledData(imageElement: HTMLImageElement, settings: Settings) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const scaledHeight = Math.ceil(imageElement.height / settings.textSize);
  const scaledWidth = Math.ceil(imageElement.width / settings.textSize);

  ctx!.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height, 0, 0, scaledWidth, scaledHeight);

  return {
    width: scaledWidth,
    height: scaledHeight,
    imageData: ctx!.getImageData(0, 0, scaledWidth, scaledHeight).data
  }
}

function prepareImageLettersData(imageElement: HTMLImageElement) {
  return {
    height: imageElement.height,
    width: imageElement.width,
    imageData: extractImageData(imageElement),
  }
}

export default function Target(props: TargetProps) {
  const [letters, setLetters] = createSignal<Letter[][]>([]);
  const [target, setTarget] = createSignal<Target>("canvas");

  createEffect(() => {
    const element = props.image();

    if (!element) {
      return;
    }

    const { width, height, imageData } = props.settings.scale == "same-size" 
      ? prepareImageScaledData(element, props.settings)
      : prepareImageLettersData(element)

    // element = new canvas from canvas scale
    const letters = convertImageToLetters(props.settings, width, height, imageData)

    setLetters(
      letters
    );
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
