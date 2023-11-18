import { Accessor, Setter } from "solid-js";
import { TargetType } from "../../../types/targetType";
import TargetControl from "../TargetControl";

interface TagetControlsProps {
  target: Accessor<TargetType>;
  onChange: Setter<TargetType>;
}

export default function TargetControls(props: TagetControlsProps) {
  return (
    <div>
      <TargetControl
        label="Canvas"
        value={TargetType.Canvas}
        onChange={props.onChange}
        checked={props.target() === TargetType.Canvas}
      />
      <TargetControl
        label="Text"
        value={TargetType.Text}
        onChange={props.onChange}
        checked={props.target() === TargetType.Text}
      />
    </div>
  );
}
