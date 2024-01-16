import { SetStoreFunction } from "solid-js/store";
import { SettingSingleDescriptor } from "../descriptors";

interface CheckboxSettingFieldProps extends SettingSingleDescriptor {
  settings: Settings;
  onChange: SetStoreFunction<Settings>;
}

export default function CheckboxSettingField(props: CheckboxSettingFieldProps) {
  return (
  <div class="flex items-center">
      <input
        id={`settings-${props.name}`}
        type="checkbox"
        onChange={(e) => props.onChange(props.name, (e.target as HTMLInputElement).checked)}
        checked={props.settings[props.name] as boolean}
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      />
      <label
        for={`settings-${props.name}`}
        class="ms-2 text-sm font-medium">{props.title}</label>
    </div>
  );
}
