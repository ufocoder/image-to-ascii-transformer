import { IColoredLetter } from "../../types/targetTypes";

const extractImageData = (element: HTMLImageElement): Uint8ClampedArray => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const height = element.height;
  const width = element.width;

  canvas.height = height;
  canvas.width = width;

  context!.drawImage(element, 0, 0);

  return context!.getImageData(0, 0, width, height).data;
};

const getAlphabetLetter = (averageColor: number, alphabet: string) => {
  const letterIndex = Math.floor((averageColor / 255) * alphabet.length);

  return alphabet[letterIndex];
};

const mergePixels = (imageData: Uint8ClampedArray, width: number, x: number, y: number, square: number) => {
  let r = 0;
  let g = 0;
  let b = 0;
  let a = 0;

  for (let i = x; i < x + square; i++) {
    for (let j = y; j < y + square; j++) {
      const index = (i + j * width) * 4;

      r = Math.max(imageData[index + 0]);
      g = Math.max(imageData[index + 1]);
      b = Math.max(imageData[index + 2]);
      a = Math.max(imageData[index + 3]);
    }
  }

  r /= square ** 2;
  g /= square ** 2;
  b /= square ** 2;
  a /= square ** 2;

  return {
    r,
    g,
    b,
    a,
  };
};

export const convertImageToLetters = (settings: Settings, element: HTMLImageElement) => {
  const height = element.height;
  const width = element.width;
  const imageData = extractImageData(element);
  const step = 1;
  const letters: IColoredLetter[][] = [];

  for (let x = 0; x < width; x += step) {
    const columnOfLetters: IColoredLetter[] = [];

    for (let y = 0; y < height; y += step) {
      const { r, g, b } = mergePixels(imageData, width, x, y, step);
      const letterColor = "#" + r.toString(16) + g.toString(16) + b.toString(16);
      const averageColor = (r + g + b) / 3;
      const letter = getAlphabetLetter(averageColor, settings.alphabet);

      columnOfLetters.push({ letter, letterColor });
    }

    letters.push(columnOfLetters);
  }

  return letters;
};
