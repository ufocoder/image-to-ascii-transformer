import { SetStoreFunction } from "solid-js/store";
import { SettingDescriptor } from "../descriptors";

interface InputSettingFieldProps extends SettingDescriptor {
  settings: Settings;
  onChange: SetStoreFunction<Settings>;
}

export default function InputSettingField(props: InputSettingFieldProps) {
  const { title, type, name, settings, onChange } = props;

  return (
    <div class="form-group">
      <label for={`settings-${name}`}>{title}</label>
      <input
        id={`settings-${name}`}
        type={type}
        onInput={(e) => onChange(name, (e.target as HTMLInputElement).value)}
        onChange={(e) => onChange(name, (e.target as HTMLInputElement).value)}
        value={settings[name] as string}
      />
    </div>
  );
}
