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
      <label for={`settings-${props.name}`}>{props.title}</label>
      <select
        id={`settings-${props.name}`}
        onChange={(e) => props.onChange(props.name, (e.target as HTMLSelectElement).value)}
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
