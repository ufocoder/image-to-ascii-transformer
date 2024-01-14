import { SetStoreFunction } from "solid-js/store";
import { SettingSingleDescriptor } from "../descriptors";

interface InputSettingFieldProps extends SettingSingleDescriptor {
  settings: Settings;
  onChange: SetStoreFunction<Settings>;
}

export default function InputSettingField(props: InputSettingFieldProps) {
  return (
    <div>
      <label 
        for={`settings-${props.name}`}
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.title}
      </label>
      <input
        id={`settings-${props.name}`}
        type={props.type}
        onInput={(e) => props.onChange(props.name, (e.target as HTMLInputElement).value)}
        onChange={(e) => props.onChange(props.name, (e.target as HTMLInputElement).value)}
        value={props.settings[props.name] as string}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
}
