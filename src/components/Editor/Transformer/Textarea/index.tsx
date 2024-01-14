import { Accessor } from "solid-js";
import Download from "./Download";
import Renderer from "./Renderer";

interface CanvasProps {
  frames: Accessor<LetterFrame[]>
  settings: Settings;
}

export default function Textarea(props: CanvasProps) {
  return (
    <div>
      <Renderer frames={props.frames} settings={props.settings} />
      <Download frames={props.frames} />
    </div>
  );
}
