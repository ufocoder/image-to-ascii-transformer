import { Accessor, For } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { SettingDescriptor, settingsDescriptors } from "./descriptors";
import CheckboxSettingField from "./fields/CheckboxField";
import InputSettingField from "./fields/InputField";
import SelectSettingField from "./fields/SelectField";

interface SettingsFormProps {
  target: Accessor<Target>;
  settings: Settings;
  onChange: SetStoreFunction<Settings>;
  onReset: () => void;
}

const checkTarget = (editorTarget: Target) => (descriptor: SettingDescriptor) => 
  descriptor.target ? descriptor.target.includes(editorTarget) : true


export default function SettingsForm(props: SettingsFormProps) {
  return (
    <form class="bg-slate-100 p-4 border-grey-100">
      <For each={settingsDescriptors.filter(checkTarget(props.target()))}>
        {(settingsDescriptor) => {
          const { name, type, title, } = settingsDescriptor;
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

      <button class="btn" type="button" onClick={() => props.onReset()}>
        Reset
      </button>
    </form>
  );
}
