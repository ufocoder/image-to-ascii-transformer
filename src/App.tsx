import { Show, createSignal } from "solid-js";

import Canvas from "./components/Canvas";
import Layout from "./components/Layout";
import SettingsForm from "./components/SettingsForm";
import UploadForm from "./components/Upload";
import { defaultSettings } from "./constants";

export default function App() {
  const [image, setImage] = createSignal<HTMLImageElement>();
  const [settings, setSettings] = createSignal<Settings>(defaultSettings);

  return (
    <Layout>
      <UploadForm onLoad={setImage} />
      <Show when={image()}>
        <SettingsForm settings={settings} onChange={setSettings} />
        <Canvas settings={settings} image={image} />
      </Show>
    </Layout>
  );
}
