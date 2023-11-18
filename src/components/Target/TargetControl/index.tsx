import { Setter } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { TargetType } from "../../../types/targetType";

interface TargetControlProps {
  label: string;
  value: TargetType;
  checked: boolean;
  onChange: Setter<TargetType>;
}

export default function TargetControl(props: TargetControlProps) {
  const onInputChange: JSX.EventHandler<HTMLInputElement, Event> = (e) => props.onChange(+e.currentTarget.value);

  return (
    <label>
      <input type="radio" name="target" value={props.value} onChange={onInputChange} checked={props.checked} />
      {props.label}
    </label>
  );
}
