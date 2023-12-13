import { Accessor, Setter, createEffect } from "solid-js";
import { getText, createLink } from "@lib/text";

interface TextProps {
  letters: Accessor<Letter[][]>;
  settings: Settings;
  onLink: Setter<HTMLAnchorElement>;
}

export default function Text(props: TextProps) {
  let textarea: HTMLTextAreaElement | undefined;

  createEffect(() => {
    if (!textarea || !props.letters().length) {
      return;
    }

    const text = getText(props.letters());
    textarea.value = text;
    props.onLink(createLink(text));
  });

  return (
    <textarea
      ref={textarea}
      readonly
      cols={props.letters().length}
      rows={props.letters()[0].length}
      style={{
        resize: "none",
        "font-family": "monospace",
        "font-size": `${props.settings.textSize}px`,
        "background-color": props.settings.backgroundColor,
        color: props.settings.textColor,
      }}
    ></textarea>
  );
}
