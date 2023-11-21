import { Show, Accessor, createSignal, createEffect } from "solid-js";
import Canvas from "../Canvas";
import { IColoredLetter, TargetType } from "../../types/targetTypes";
import { convertImageToLetters } from "./lib";

interface TargetProps {
  target: Accessor<TargetType>;
  image: Accessor<HTMLImageElement | undefined>;
  settings: Accessor<Settings>;
}

export default function Target(props: TargetProps) {
  const [letters, setLetters] = createSignal<IColoredLetter[][]>([]);

  createEffect(() => {
    const element = props.image();

    if (!element) return;

    setLetters(convertImageToLetters(props.settings(), element));
  });

  return (
    <Show when={letters().length}>
      <Show when={props.target() === TargetType.Canvas}>
        <Canvas settings={props.settings} letters={letters} />
      </Show>
    </Show>
  );
}
