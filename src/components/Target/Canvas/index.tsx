import { Accessor, createSignal } from "solid-js";
import DownloadCanvas from "@app/components/Target/Canvas/DownloadCanvas";
import Renderer from "@app/components/Target/Canvas/Renderer";

interface CanvasProps {
  letters: Accessor<Letter[][]>;
  settings: Settings;
}

export default function Canvas(props: CanvasProps) {
  const [canvas, setCanvas] = createSignal<HTMLCanvasElement | undefined>();

  return (
    <>
      <DownloadCanvas canvas={canvas} />
      <Renderer canvas={canvas} letters={props.letters} settings={props.settings} setCanvas={setCanvas} />
    </>
  );
}
