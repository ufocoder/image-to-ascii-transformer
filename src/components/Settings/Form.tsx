import { For } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { settingsDescriptors } from "./descriptors";
import CheckboxSettingField from "./fields/CheckboxField";
import InputSettingField from "./fields/InputField";
import SelectSettingField from "./fields/SelectField";

interface SettingsFormProps {
  settings: Settings;
  onChange: SetStoreFunction<Settings>;
  onReset: () => void;
}

export default function SettingsForm(props: SettingsFormProps) {

  return (
    <form>
      <For each={settingsDescriptors}>
        {(settingsDescriptor) => {
          const { name, type, title } = settingsDescriptor;
          switch (type) {
            case "boolean":
              return (
                <CheckboxSettingField
                  onChange={props.onChange}
                  settings={props.settings}
                  title={title}
                  type={type}
                  name={name}
                />
              );

            case "select":
              return (
                <SelectSettingField
                  onChange={props.onChange}
                  settings={props.settings}
                  title={title}
                  type={type}
                  name={name}
                  options={settingsDescriptor.options}
                />
              );

            default:
              return (
                <InputSettingField
                  onChange={props.onChange}
                  settings={props.settings}
                  title={title}
                  type={type}
                  name={name}
                />
              );
          }
        }}
      </For>

      <button class="btn" type="button" onClick={props.onReset}>
        Reset
      </button>
    </form>
  );
}
