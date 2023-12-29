import { Accessor, createSignal } from "solid-js";
import Download from "./Download";
import Renderer from "./Renderer";

interface CanvasProps {
  letters: Accessor<Letter[][]>;
  settings: Settings;
}

export default function Textarea(props: CanvasProps) {
  const [ref, setRef] = createSignal<HTMLTextAreaElement | undefined>();

  return (
    <>
      <Download ref={ref} />
      <Renderer ref={ref} letters={props.letters} settings={props.settings} setRef={setRef} />
    </>
  );
}
