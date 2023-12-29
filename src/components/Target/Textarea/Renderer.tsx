import { Accessor, Setter, createEffect } from "solid-js";
import { getText } from "@app/components/Target/Textarea/lib";

interface TextProps {
  ref: Accessor<HTMLTextAreaElement | undefined>;
  setRef: Setter<HTMLTextAreaElement | undefined>;
  letters: Accessor<Letter[][]>;
  settings: Settings;
}

export default function Text(props: TextProps) {
  createEffect(() => {
    if (!props.ref() || !props.letters().length) {
      return;
    }

    const text = getText(props.letters());
    props.ref()!.value = text;
  });

  return (
    <textarea
      readonly
      ref={props.setRef}
      cols={props.letters().length}
      rows={props.letters()[0].length}
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
