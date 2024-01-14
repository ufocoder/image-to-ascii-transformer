import { Accessor, createEffect, createSignal } from "solid-js";
import Container from "@app/components/Editor/Container";
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
    <Container>
      <textarea
        readonly
        cols={letters().length}
        rows={letters().length ? letters()[0].length : undefined}
        style={{
          resize: "none",
          "font-family": "monospace",
          "font-size": `${props.settings.textSize}px`,
          "background-color": props.settings.backgroundColor,
          color: props.settings.textColor,
        }}
      >
        {letters().length ? getText(letters()) : null}
        </textarea>
      </Container>
  );
}
