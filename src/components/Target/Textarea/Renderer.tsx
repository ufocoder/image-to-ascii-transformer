import { Accessor, Setter, createEffect, createSignal } from "solid-js";
import { getText } from "@app/components/Target/Textarea/lib";
import { LetterFrame } from "../types";

interface TextProps {
  ref: Accessor<HTMLTextAreaElement | undefined>;
  setRef: Setter<HTMLTextAreaElement | undefined>;
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

  createEffect(() => {
    if (!props.ref() || !letters().length) {
      return;
    }

    const text = getText(letters());

    props.ref()!.value = text;
  });

  return (
    <textarea
      readonly
      ref={props.setRef}
      cols={letters().length}
      rows={letters().length ? letters()[0].length : undefined}
      style={{
        resize: "none",
        "font-family": "monospace",
        "font-size": `${props.settings.textSize}px`,
        "background-color": props.settings.backgroundColor,
        color: props.settings.textColor,
      }}
    />
  );
}
