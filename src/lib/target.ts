import { ParsedFrame } from "gifuct-js";

const getAlphabetLetter = (averageColor: number, alphabet: string) => {
  const letterIndex = Math.floor((averageColor / 256) * alphabet.length);

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
      const alpha = imageData[index + 3];

      if (settings.ignoreTransparentPixels && alpha === 0) {
        columnOfLetters.push({ letter: " ", color: "transparent", transparent: true });
        continue;
      }

      const color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
      const averageColor = (r + g + b) / 3;
      const letter = getAlphabetLetter(averageColor, settings.alphabet);

      columnOfLetters.push({ letter, color, transparent: false });
    }

    letters.push(columnOfLetters);
  }

  return letters;
};

export const createGifFrameComposer = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d", { willReadFrequently: true })!;
  const patchCanvas = document.createElement("canvas");
  const patchContext = patchCanvas.getContext("2d")!;

  let previousFrame: ParsedFrame | undefined;
  let restoreImageData: ImageData | undefined;

  return (frame: ParsedFrame) => {
    if (previousFrame?.disposalType === 2) {
      const { left, top, width, height } = previousFrame.dims;
      context.clearRect(left, top, width, height);
    } else if (previousFrame?.disposalType === 3 && restoreImageData) {
      context.putImageData(restoreImageData, 0, 0);
    }

    restoreImageData = frame.disposalType === 3
      ? context.getImageData(0, 0, canvas.width, canvas.height)
      : undefined;

    patchCanvas.width = frame.dims.width;
    patchCanvas.height = frame.dims.height;
    patchContext.putImageData(
      new ImageData(frame.patch, frame.dims.width, frame.dims.height),
      0,
      0,
    );
    context.drawImage(patchCanvas, frame.dims.left, frame.dims.top);

    previousFrame = frame;

    return context.getImageData(0, 0, canvas.width, canvas.height);
  };
};

export function prepareFrameData(
  imageData: ImageData,
  textSize: Settings['textSize'],
  scale: Settings['scale'],
) {
  if (scale !== "same-size") {
    return {
      width: imageData.width,
      height: imageData.height,
      imageData: imageData.data,
    };
  }

  const sourceCanvas = document.createElement("canvas");
  const sourceContext = sourceCanvas.getContext("2d")!;
  sourceCanvas.width = imageData.width;
  sourceCanvas.height = imageData.height;
  sourceContext.putImageData(imageData, 0, 0);

  const scaledWidth = Math.ceil(imageData.width / textSize);
  const scaledHeight = Math.ceil(imageData.height / textSize);
  const scaledCanvas = document.createElement("canvas");
  const scaledContext = scaledCanvas.getContext("2d")!;
  scaledCanvas.width = scaledWidth;
  scaledCanvas.height = scaledHeight;
  scaledContext.drawImage(sourceCanvas, 0, 0, scaledWidth, scaledHeight);

  return {
    width: scaledWidth,
    height: scaledHeight,
    imageData: scaledContext.getImageData(0, 0, scaledWidth, scaledHeight).data,
  };
}

export function prepareImageScaledData(element: HTMLImageElement, textSize: Settings['textSize']) {
  const scaledHeight = Math.ceil(element.height / textSize);
  const scaledWidth = Math.ceil(element.width / textSize);

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
