import { Show, createSignal } from "solid-js";

import Layout from "./components/Layout";
import SettingsForm from "./components/Settings";
import UploadForm from "./components/Upload";
import { defaultSettings } from "./constants";
import TargetControls from "./components/Target/TargetControls";
import Target from "./components/Target";
import { TargetType } from "./types/targetType";

export default function App() {
  const [image, setImage] = createSignal<HTMLImageElement>();
  const [settings, setSettings] = createSignal<Settings>(defaultSettings);
  const [target, setTarget] = createSignal<TargetType>(TargetType.Canvas);

  return (
    <Layout>
      <div class="Layout-sidebar">
        <UploadForm onLoad={setImage} />
        <Show when={image()}>
          <SettingsForm settings={settings} onChange={setSettings} />
        </Show>
      </div>
      <div class="Layout-main">
        <TargetControls target={target} onChange={setTarget} />
        <Target target={target} settings={settings} image={image} />
      </div>
    </Layout>
  );
}
