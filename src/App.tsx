import { Show, createSignal } from "solid-js";
import Layout from "./components/Layout";
import SettingsForm from "./components/Settings";
import UploadForm from "./components/Upload";
import { defaultSettings } from "./constants";
import Target from "./components/Target";

export default function App() {
  const [image, setImage] = createSignal<HTMLImageElement>();
  const [settings, setSettings] = createSignal<Settings>(defaultSettings);

  return (
    <Layout>
      <div class="Layout-sidebar">
        <UploadForm onLoad={setImage} />
        <Show when={image()}>
          <SettingsForm settings={settings} onChange={setSettings} />
        </Show>
      </div>
      <div class="Layout-main">
        <Target settings={settings} image={image} />
      </div>
    </Layout>
  );
}
