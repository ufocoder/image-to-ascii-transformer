import { Accessor, Setter } from "solid-js";
import TargetControl from "../TargetControl";

interface TagetControlsProps {
  target: Accessor<Target>;
  onChange: Setter<Target>;
}

export default function TargetControls(props: TagetControlsProps) {
  return (
    <div>
      <TargetControl
        label="Canvas"
        value="canvas"
        onChange={props.onChange}
        checked={props.target() === "canvas"}
      />
      <TargetControl
        label="Text"
        value="textarea"
        onChange={props.onChange}
        checked={props.target() === "textarea"}
      />
    </div>
  );
}
