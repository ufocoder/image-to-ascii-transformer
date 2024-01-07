import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import Layout from "./components/Layout";
import SettingsForm from "./components/Settings";
import UploadForm from "./components/Upload";
import { defaultSettings } from "./constants";
import Target from "./components/Target";

export default function App() {
  const [imageContainer, setImageContainer] = createSignal<ImageContainer>();
  const [settings, setSettings] = createStore<Settings>({ ...defaultSettings });

  return (
    <Layout>
      <div class="Layout-sidebar">
        <UploadForm onLoad={setImageContainer} />
        <Show when={imageContainer}>
          <SettingsForm settings={settings} onChange={setSettings} />
        </Show>
      </div>
      <div class="Layout-main">
        <Target settings={settings} imageContainer={imageContainer} />
      </div>
    </Layout>
  );
}
