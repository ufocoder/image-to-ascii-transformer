export const drawLetters = (context: CanvasRenderingContext2D, settings: Settings, letters: Letter[][]) => {
  // fill background
  const ratio = settings.textSize;
  const height = letters[0].length;
  const width = letters.length;

  context.fillStyle = settings.backgroundColor;
  context.fillRect(0, 0, width * ratio, height * ratio);

  // prepare text style
  context.font = settings.textSize + "px sans-serif";
  context.textAlign = "start";
  context.textBaseline = "top";

  // draw letters
  const step = 1;

  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      const { letter, color } = letters[x][y];

      context.fillStyle = settings.colored ? color : settings.textColor;
      context.fillText(letter, (x / step) * settings.textSize, (y / step) * settings.textSize, settings.textSize);
    }
  }
};

export function createLink(canvas: HTMLCanvasElement) {
  const link = document.createElement("a");

  link.download = "image-from-canvas.png";
  link.href = canvas.toDataURL();
  link.innerText = "Download image from canvas";

  return link;
}
