import { Accessor, Show, createEffect, createSignal } from "solid-js";
import Container from "@app/components/Editor/Container";
import Download from "./Download";
import Renderer from "./Renderer";

interface CanvasProps {
  frames: Accessor<LetterFrame[]>
  settings: Settings;
}

export default function Textarea(props: CanvasProps) {
  const [frameIndex, setFrameIndex] = createSignal(0);

  createEffect(() => {
    const lastFrameIndex = Math.max(0, props.frames().length - 1);

    if (frameIndex() > lastFrameIndex) {
      setFrameIndex(lastFrameIndex);
    }
  });

  const handleFrameChange = (event: InputEvent) => {
    const value = Number.parseInt((event.target as HTMLInputElement).value, 10);

    if (Number.isNaN(value)) {
      return;
    }

    setFrameIndex(Math.min(Math.max(value - 1, 0), props.frames().length - 1));
  };

  return (
    <>
      <Container>
        <h3 class="block text-center text-2xl mb-2">
          Transformed image
        </h3>
        <Show when={props.frames().length > 1}>
          <label class="flex items-center justify-center gap-2 mb-3 text-sm font-medium">
            Frame
            <input
              type="number"
              min="1"
              max={props.frames().length}
              value={frameIndex() + 1}
              onInput={handleFrameChange}
              class="w-20 h-8 px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <span>of {props.frames().length}</span>
          </label>
        </Show>
        <Renderer frames={props.frames} frameIndex={frameIndex} settings={props.settings} />
        <Download frames={props.frames} frameIndex={frameIndex} />
      </Container>
    </>
  );
}
