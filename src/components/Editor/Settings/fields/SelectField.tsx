import { SetStoreFunction } from "solid-js/store";
import { SettingMultipleDescriptor } from "../descriptors";
import { For } from "solid-js";

interface SelectSettingFieldProps extends SettingMultipleDescriptor {
  settings: Settings;
  onChange: SetStoreFunction<Settings>;
}

export default function SelectSettingField(props: SelectSettingFieldProps) {
  return (
    <div class="form-group">
      <label 
        for={`settings-${props.name}`}
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{props.title}</label>
      <select
        id={`settings-${props.name}`}
        onChange={(e) => props.onChange(props.name, (e.target as HTMLSelectElement).value)}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <For each={props.options}>
          {({ title, value }) => (
            <option value={value} selected={props.settings.scale === value}>
              {title}
            </option>
          )}
        </For>
      </select>
    </div>
  );
}
