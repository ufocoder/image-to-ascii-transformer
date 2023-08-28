import { Accessor, Setter, For } from "solid-js";
import { defaultSettings } from "../../constants";
import { settingsDescriptors } from "./descriptors";
import CheckboxSettingField from "./fields/CheckboxField";
import InputSettingField from "./fields/InputField";

type HandlerCreator = (fieldName: keyof Settings) => (fieldValue: any) => void;

interface SettingsFormProps {
    settings: Accessor<Settings>;
    onChange: Setter<Settings>;
}

export default function SettingsForm(props: SettingsFormProps) {
    const createChangeHandler: HandlerCreator = (fieldName) => (value: any) => {
        console.log('changed value', value)
        return props.onChange(prevSettings => ({
            ...prevSettings,
            [fieldName]: value
        }));
    }

    const handleResetButtonClick = () => {
        props.onChange(defaultSettings);
    }

    const values = props.settings()

    console.log('SettingsForm', values)

    return (
        <form>
            <For each={settingsDescriptors}>{({ name, type, title }) => {
                if (type === "boolean") {
                    return (
                        <CheckboxSettingField 
                            onChange={createChangeHandler(name)}
                            value={values[name] as boolean}
                            title={title} 
                            name={name} />
                    );
                }

                return (
                    <InputSettingField 
                        onChange={createChangeHandler(name)}
                        value={values[name] as string}
                        title={title}
                        type={type} 
                        name={name} 
                    />
                );
            }}</For>

            <button class="btn" type="button" onClick={handleResetButtonClick}>Reset</button>
        </form>
    );
}
