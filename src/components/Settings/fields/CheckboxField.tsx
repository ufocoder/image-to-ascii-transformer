import { SettingDescriptor } from "../descriptors";

interface CheckboxSettingFieldProps {
    title: string;
    value: boolean;
    name: keyof Settings;
    onChange: (value: boolean) => void;
}

export default function CheckboxSettingField(props: CheckboxSettingFieldProps) {
    const { title, name, value, onChange } = props;

    return (
        <div class="form-group">
            <label for={`settings-${name}`}>
                {title}
            </label>
            <input 
                id={`settings-${name}`} 
                type='checkbox'
                checked={value}
                onChange={() => onChange(!value)} />
            </div>
    )
}
