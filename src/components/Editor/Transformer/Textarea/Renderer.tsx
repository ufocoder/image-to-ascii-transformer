import { Accessor, Show, createEffect, createSignal } from "solid-js";

import { getText } from "@app/components/Editor/Transformer/Textarea/lib";

interface TextProps {
  frames: Accessor<LetterFrame[]>
  settings: Settings;
}

export default function Text(props: TextProps) {
  const [letters, setLetters] = createSignal<Letter[][]>([]);

  createEffect(() => {
    if (!props.frames().length) {
      return
    }

    const frame = props.frames()[0];

    setLetters(frame.letters);
  });

  return (
    <>
      <textarea
        readonly
        cols={letters().length}
        rows={letters().length ? letters()[0].length : undefined}
        style={{
          resize: "none",
          "font-family": "monospace",
          "font-size": `8px`,
          "background-color": props.settings.backgroundColor,
          color: props.settings.textColor,
        }}
      >
        {letters().length ? getText(letters()) : null}
      </textarea>
      <Show when={letters().length}>
        <p class="text-center my-2">
            size is 
            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.5">
              {letters().length}x{letters()[0].length} letters
            </span>
        </p>
      </Show>
    </>
  );
}
