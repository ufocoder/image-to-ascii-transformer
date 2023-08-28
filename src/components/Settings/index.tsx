import { Accessor, Setter } from "solid-js";
import SettingsForm from "./Form";

interface SettingsProps {
    settings: Accessor<Settings>;
    onChange: Setter<Settings>;
}

export default function Settings(props: SettingsProps) {
    return (
        <div>
            <h3>Settings</h3>
            <SettingsForm settings={props.settings} onChange={props.onChange} />
        </div>
    );
}