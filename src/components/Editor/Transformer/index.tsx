import { Show, Accessor } from "solid-js";
import Canvas from "./Canvas";
import Textarea from "./Textarea";

interface TargetProps {
  settings: Settings;
  frames: Accessor<LetterFrame[]>;
  target: Accessor<Target>;
}

export default function Target(props: TargetProps) {
  return (
    <Show when={props.frames().length}>
      <Show when={props.target() === "canvas"}>
        <Canvas settings={props.settings} frames={props.frames} />
      </Show>
      <Show when={props.target() === "textarea"}>
        <Textarea settings={props.settings} frames={props.frames} />
      </Show>
    </Show>
  );
}
