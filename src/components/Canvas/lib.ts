import { IColoredLetter } from "../../types/targetTypes";

export const drawLetters = (context: CanvasRenderingContext2D, settings: Settings, letters: IColoredLetter[][]) => {
  // fill background
  const ratio = settings.textSize;
  const height = letters[0].length;
  const width = letters.length;

  context.fillStyle = settings.backgroundColor;
  context.fillRect(0, 0, width * ratio, height * ratio);

  // prepare text style
  context.font = settings.textSize + "px";
  context.textAlign = "start";
  context.textBaseline = "top";

  // draw letters
  const step = 1;

  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      const { letter, letterColor } = letters[x][y];

      context.fillStyle = settings.colored ? letterColor : settings.textColor;
      context.fillText(letter, (x / step) * settings.textSize, (y / step) * settings.textSize);
    }
  }
};
