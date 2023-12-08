import { Setter } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

interface TargetControlProps {
  label: string;
  value: Target;
  checked: boolean;
  onChange: Setter<Target>;
}

export default function TargetControl(props: TargetControlProps) {
  const onInputChange: JSX.EventHandler<HTMLInputElement, Event> = (e) => props.onChange(e.currentTarget.value as Target);

  return (
    <label>
      <input type="radio" name="target" value={props.value} onChange={onInputChange} checked={props.checked} />
      {props.label}
    </label>
  );
}
