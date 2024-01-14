import { SetStoreFunction } from "solid-js/store";
import { SettingSingleDescriptor } from "../descriptors";

interface CheckboxSettingFieldProps extends SettingSingleDescriptor {
  settings: Settings;
  onChange: SetStoreFunction<Settings>;
}

export default function CheckboxSettingField(props: CheckboxSettingFieldProps) {
  return (
  <div class="flex items-center mb-4">
      <input
        id={`settings-${props.name}`}
        type="checkbox"
        onChange={(e) => props.onChange(props.name, (e.target as HTMLInputElement).checked)}
        checked={props.settings[props.name] as boolean}
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        for={`settings-${props.name}`}
        class="ms-2 text-sm font-medium dark:text-gray-500">{props.title}</label>
    </div>
  );
}
