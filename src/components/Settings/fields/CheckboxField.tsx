import { SetStoreFunction } from "solid-js/store";
import { SettingDescriptor } from "../descriptors";

interface CheckboxSettingFieldProps extends SettingDescriptor {
  settings: Settings;
  onChange: SetStoreFunction<Settings>;
}

export default function CheckboxSettingField(props: CheckboxSettingFieldProps) {
  const { title, name, settings, onChange } = props;

  return (
    <div class="form-group">
      <label for={`settings-${name}`}>{title}</label>
      <input
        id={`settings-${name}`}
        type="checkbox"
        onChange={(e) => onChange(name, (e.target as HTMLInputElement).value)}
        checked={settings[name] as boolean}
      />
    </div>
  );
}
