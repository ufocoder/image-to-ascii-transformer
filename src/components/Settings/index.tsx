import { SetStoreFunction } from "solid-js/store";
import SettingsForm from "./Form";

interface SettingsProps {
  settings: Settings;
  onChange: SetStoreFunction<Settings>;
  onReset: () => void;
}

export default function Settings(props: SettingsProps) {
  return (
    <div>
      <h3>Settings</h3>
      <SettingsForm settings={props.settings} onReset={props.onReset} onChange={props.onChange} />
    </div>
  );
}
