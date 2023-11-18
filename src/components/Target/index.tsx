import { Show, Accessor } from "solid-js";
import Canvas from "../Canvas";
import { TargetType } from "../../types/targetType";

interface TargetProps {
  target: Accessor<TargetType>;
  image: Accessor<HTMLImageElement>;
  settings: Accessor<Settings>;
}

export default function Target(props: TargetProps) {
  return (
    <Show when={props.image()}>
      <Show when={props.target() === TargetType.Canvas}>
        <Canvas settings={props.settings} image={props.image} />
      </Show>
    </Show>
  );
}
