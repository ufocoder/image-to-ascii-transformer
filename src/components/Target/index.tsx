import { Show, Accessor, createSignal, createEffect } from "solid-js";
import Canvas from "../Canvas";
import { IColoredLetter, TargetType } from "../../types/targetTypes";
import { convertImageToLetters } from "./lib";
import TargetControls from "./TargetControls";

interface TargetProps {
  image: Accessor<HTMLImageElement | undefined>;
  settings: Accessor<Settings>;
}

export default function Target(props: TargetProps) {
  const [letters, setLetters] = createSignal<IColoredLetter[][]>([]);
  const [target, setTarget] = createSignal<TargetType>(TargetType.Canvas);

  createEffect(() => {
    const element = props.image();

    if (!element) return;

    setLetters(convertImageToLetters(props.settings(), element));
  });

  return (
    <>
      <TargetControls target={target} onChange={setTarget} />
      <Show when={letters().length}>
        <Show when={target() === TargetType.Canvas}>
          <Canvas settings={props.settings} letters={letters} />
        </Show>
      </Show>
    </>
  );
}
