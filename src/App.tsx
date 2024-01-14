import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { defaultSettings } from "./constants";
import Layout from "./components/Layout";
import Editor from "./components/Editor";
import UploadForm from "./components/Upload";

export default function App() {
  const [imageContainer, setImageContainer] = createSignal<ImageContainer>();
  const [settings, setSettings] = createStore<Settings>({ ...defaultSettings });
  const resetContainer = () => setImageContainer()

  const handleLoad = (imageContainer: ImageContainer, settings?: Optional<Settings>) => {
    if (settings) {
      setSettings({
        ...defaultSettings,
        ...settings
      })
    }
    setImageContainer(imageContainer);
  }

  return (
    <Layout>
      <Show when={!imageContainer()}>
        <UploadForm onLoad={handleLoad} />
      </Show>
      <Show when={imageContainer()}>
        <Editor imageContainer={imageContainer} resetContainer={resetContainer} settings={settings} setSettings={setSettings} />
      </Show>
    </Layout>
  );
}
