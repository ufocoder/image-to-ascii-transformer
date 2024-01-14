import { Accessor } from "solid-js";
import Container from "@app/components/Editor/Container";
import Download from "./Download";
import Renderer from "./Renderer";

interface CanvasProps {
  mime: string;
  frames: Accessor<LetterFrame[]>;
  settings: Settings;
}

export default function Canvas(props: CanvasProps) {
  return (
    <>
      <Container>
        <h3 class="block text-center text-2xl mb-2">
          Transformed image
        </h3>
        <Renderer frames={props.frames} settings={props.settings} />
        <Download frames={props.frames} settings={props.settings} mime={props.mime}/>
      </Container>
    </>
  );
}
