import { Accessor, createSignal } from "solid-js";
import Download from "./Download";
import Renderer from "./Renderer";
import { LetterFrame } from "../types";

interface CanvasProps {
  frames: Accessor<LetterFrame[]>
  settings: Settings;
}

export default function Canvas(props: CanvasProps) {
  const [ref, setRef] = createSignal<HTMLCanvasElement | undefined>();

  return (
    <>
      <Download ref={ref} />
      <Renderer ref={ref} frames={props.frames} settings={props.settings} setRef={setRef} />
    </>
  );
}
