import { SetStoreFunction } from "solid-js/store";
import { SettingBaseDescriptor } from "../descriptors";

interface InputSettingFieldProps extends SettingBaseDescriptor {
  settings: Settings;
  onChange: SetStoreFunction<Settings>;
}

export default function InputSettingField(props: InputSettingFieldProps) {
  return (
    <div class="form-group">
      <label for={`settings-${props.name}`}>{props.title}</label>
      <input
        id={`settings-${props.name}`}
        type={props.type}
        onInput={(e) => props.onChange(props.name, (e.target as HTMLInputElement).value)}
        onChange={(e) => props.onChange(props.name, (e.target as HTMLInputElement).value)}
        value={props.settings[props.name] as string}
      />
    </div>
  );
}
