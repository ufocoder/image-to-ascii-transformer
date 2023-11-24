import { For } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { defaultSettings } from "../../constants";
import { settingsDescriptors } from "./descriptors";
import CheckboxSettingField from "./fields/CheckboxField";
import InputSettingField from "./fields/InputField";

interface SettingsFormProps {
  settings: Settings;
  onChange: SetStoreFunction<Settings>;
}

export default function SettingsForm(props: SettingsFormProps) {
  const handleResetButtonClick = () => {
    props.onChange({ ...defaultSettings });
  };

  return (
    <form>
      <For each={settingsDescriptors}>
        {({ name, type, title }) => {
          if (type === "boolean") {
            return (
              <CheckboxSettingField
                onChange={props.onChange}
                settings={props.settings}
                title={title}
                type={type}
                name={name}
              />
            );
          }

          return (
            <InputSettingField
              onChange={props.onChange}
              settings={props.settings}
              title={title}
              type={type}
              name={name}
            />
          );
        }}
      </For>

      <button class="btn" type="button" onClick={handleResetButtonClick}>
        Reset
      </button>
    </form>
  );
}
