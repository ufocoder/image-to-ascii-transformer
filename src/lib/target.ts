import { ParsedFrame } from "gifuct-js";

const getAlphabetLetter = (averageColor: number, alphabet: string, invert: boolean) => {
  let letterIndex = Math.floor((averageColor / 256) * alphabet.length);

  if (invert) letterIndex = alphabet.length - 1 - letterIndex;

  return alphabet[letterIndex];
};

export const convertImageToLetters = (
  settings: Settings,
  width: number,
  height: number,
  imageData: Uint8ClampedArray
): Letter[][] => {
  const letters: Letter[][] = [];

  for (let x = 0; x < width; x++) {
    const columnOfLetters: Letter[] = [];

    for (let y = 0; y < height; y++) {
      const index = (x + y * width) * 4;

      const r = imageData[index + 0];
      const g = imageData[index + 1];
      const b = imageData[index + 2];

      const color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
      const averageColor = (r + g + b) / 3;
      const letter = getAlphabetLetter(averageColor, settings.alphabet, settings.invertColors);

      columnOfLetters.push({ letter, color });
    }

    letters.push(columnOfLetters);
  }

  return letters;
};

export const frameToImage = (canvas: HTMLCanvasElement, frame: ParsedFrame): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const prevImageData = ctx!.getImageData(frame.dims.left, frame.dims.top, frame.dims.width, frame.dims.height);

    for (let i = 3; i < frame.patch.length; i += 4) {
      if (frame.patch[i] !== 0) continue;

      frame.patch[i - 3] = prevImageData.data[i - 3];
      frame.patch[i - 2] = prevImageData.data[i - 2];
      frame.patch[i - 1] = prevImageData.data[i - 1];
      frame.patch[i] = prevImageData.data[i];
    }

    const imageData = new ImageData(frame.patch, frame.dims.width, frame.dims.height);

    ctx!.putImageData(imageData, frame.dims.left, frame.dims.top);

    const element = new Image(canvas.width, canvas.height);

    element.onload = () => resolve(element);
    element.onerror = () => reject();
    element.src = canvas.toDataURL();
  });

export function prepareImageScaledData(element: HTMLImageElement, settings: Settings) {
  const scaledHeight = Math.ceil(element.height / settings.textSize);
  const scaledWidth = Math.ceil(element.width / settings.textSize);

  const canvas = document.createElement("canvas");

  canvas.height = scaledHeight;
  canvas.width = scaledWidth;

  const ctx = canvas.getContext("2d");

  ctx!.drawImage(element, 0, 0, element.width, element.height, 0, 0, scaledWidth, scaledHeight);

  return {
    width: scaledWidth,
    height: scaledHeight,
    imageData: ctx!.getImageData(0, 0, scaledWidth, scaledHeight).data,
  };
}

export const extractImageData = (element: HTMLImageElement): Uint8ClampedArray => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const height = element.height;
  const width = element.width;

  canvas.height = height;
  canvas.width = width;

  context!.drawImage(element, 0, 0);

  return context!.getImageData(0, 0, width, height).data;
};

export function prepareImageLettersData(element: HTMLImageElement) {
  return {
    height: element.height,
    width: element.width,
    imageData: extractImageData(element),
  };
}
