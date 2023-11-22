import { For } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { defaultSettings } from "../../constants";
import { settingsDescriptors } from "./descriptors";
import CheckboxSettingField from "./fields/CheckboxField";
import InputSettingField from "./fields/InputField";

type FieldValue = string | number | boolean;
type HandlerCreator = (fieldName: keyof Settings) => (fieldValue: FieldValue) => void;

interface SettingsFormProps {
  settings: Settings;
  onChange: SetStoreFunction<Settings>;
}

export default function SettingsForm(props: SettingsFormProps) {
  const createChangeHandler: HandlerCreator = (fieldName) => (value: FieldValue) => {
    return props.onChange(fieldName, value);
  };

  const handleResetButtonClick = () => {
    props.onChange(defaultSettings);
  };

  return (
    <form>
      <For each={settingsDescriptors}>
        {({ name, type, title }) => {
          if (type === "boolean") {
            return (
              <CheckboxSettingField
                onChange={createChangeHandler(name)}
                value={props.settings[name] as boolean}
                title={title}
                type={type}
                name={name}
              />
            );
          }

          return (
            <InputSettingField
              onChange={createChangeHandler(name)}
              value={props.settings[name] as string}
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
