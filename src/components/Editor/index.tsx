import { Accessor, createEffect, createSignal } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { defaultSettings } from "@app/constants";
import { createFrameLetters } from "./lib";
import Preview from "./Preview";
import Transformer from "./Transformer";
import Target from "./Target";
import Settings from "./Settings";


interface TargetProps {
  settings: Settings;
  setSettings: SetStoreFunction<Settings>;
  imageContainer: Accessor<ImageContainer>;
  resetContainer: () => void;
}

export default function Editor(props: TargetProps) {
  const [frames, setFrames] = createSignal<LetterFrame[]>([]);
  const [target, setTarget] = createSignal<Target>("canvas");

  createEffect(() => {
    (async () => {
      const container = props.imageContainer();

      if (!container) {
        return;
      }

      const frames = await createFrameLetters(container, props.settings)

      setFrames(frames);
    })();
  });

  const handleReset = () => props.setSettings({ ... defaultSettings });

  return (
    <div class="flex flex-col">
      <div class="mx-auto mb-4">
        <Target target={target} onChange={setTarget} />
      </div>
      <div class="flex flex-col md:flex-row gap-x-4 gap-y-4">
        <div class="md:flex-1 ">
          <Preview resetContainer={props.resetContainer} imageContainer={props.imageContainer} />
        </div>
        <div class="md:grow-0 md:shrink-0 md:basis-60">
          <Settings target={target} settings={props.settings} onReset={handleReset} onChange={props.setSettings} />
        </div>
        <div class="md:flex-1">
          <Transformer target={target} settings={props.settings} mime={props.imageContainer()!.mime} frames={frames} />
        </div>
      </div>
    </div>
  )
}