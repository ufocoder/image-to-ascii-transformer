import { SetStoreFunction } from "solid-js/store";
import SettingsForm from "./Form";

interface SettingsProps {
  settings: Settings;
  onChange: SetStoreFunction<Settings>;
}

export default function Settings(props: SettingsProps) {
  return (
    <div>
      <h3>Settings</h3>
      <SettingsForm settings={props.settings} onChange={props.onChange} />
    </div>
  );
}
