import { Accessor } from "solid-js";
import { IColoredLetter } from "../../types/targetTypes";
import { getText } from "./lib";

interface TextProps {
  letters: Accessor<IColoredLetter[][]>;
  settings: Settings;
}

export default function Text(props: TextProps) {
  return (
    <textarea
      readonly
      cols={props.letters().length}
      rows={props.letters()[0].length}
      style={`
        resize: none;
        font-family: 'Courier New';
        font-size: ${props.settings.textSize}px;
        background-color: ${props.settings.backgroundColor};
        color: ${props.settings.textColor};
      `}
    >
      {getText(props.letters())}
    </textarea>
  );
}
