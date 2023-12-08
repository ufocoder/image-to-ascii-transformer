import { SetStoreFunction } from "solid-js/store";
import { SettingDescriptor } from "../descriptors";

interface CheckboxSettingFieldProps extends SettingDescriptor {
  settings: Settings;
  onChange: SetStoreFunction<Settings>;
}

export default function CheckboxSettingField(props: CheckboxSettingFieldProps) {
  return (
    <div class="form-group">
      <label for={`settings-${props.name}`}>{props.title}</label>
      <input
        id={`settings-${props.name}`}
        type="checkbox"
        onChange={(e) => props.onChange(props.name, (e.target as HTMLInputElement).checked)}
        checked={props.settings[props.name] as boolean}
      />
    </div>
  );
}
