import { Accessor, Setter } from "solid-js";
import Control from "./Control";

interface TagetControlsProps {
  target: Accessor<Target>;
  onChange: Setter<Target>;
}

export default function Controls(props: TagetControlsProps) {
  return (
    <div>
      <Control
        label="Canvas"
        value="canvas"
        onChange={props.onChange}
        checked={props.target() === "canvas"}
      />
      <Control
        label="Text"
        value="textarea"
        onChange={props.onChange}
        checked={props.target() === "textarea"}
      />
    </div>
  );
}
