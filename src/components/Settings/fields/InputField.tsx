import { SettingDescriptor, SettingType } from "../descriptors";

interface InputSettingFieldProps {
    title: string;
    value: string;
    type: SettingType
    name: keyof Settings;
    onChange: (value: string) => void;
}

export default function InputSettingField(props: InputSettingFieldProps) {
    const { title, type, name, value, onChange } = props;

    return (
        <div class="form-group">
            <label for={`settings-${name}`}>
                {title}
            </label>
            <input 
                id={`settings-${name}`} 
                type={type}
                onInput={e => onChange((e.target as HTMLInputElement).value)}
                onChange={e => onChange((e.target as HTMLInputElement).value)}
                value={value} />
            </div>
    )
}