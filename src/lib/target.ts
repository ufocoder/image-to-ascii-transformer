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

export const frameToImage = (canvas: HTMLCanvasElement, frame: ParsedFrame) => {
  const imageData = new ImageData(frame.patch, frame.dims.width, frame.dims.height);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  
  ctx!.putImageData(imageData, frame.dims.left, frame.dims.top);
  
  const element = new Image(canvas.width, canvas.height);
//
  element.src = canvas.toDataURL();

  return element
}

export function prepareImageScaledData(element: HTMLImageElement, settings: Settings) {
  
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const scaledHeight = Math.ceil(element.height / settings.textSize);
  const scaledWidth = Math.ceil(element.width / settings.textSize);

  ctx!.drawImage(element, 0, 0, element.width, element.height, 0, 0, scaledWidth, scaledHeight);

  console.log('scaledHeight', scaledHeight,'scaledWidth', scaledWidth)
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
  console.log('prepareImageLettersData')
  return {
    height: element.height,
    width: element.width,
    imageData: extractImageData(element),
  };
}
