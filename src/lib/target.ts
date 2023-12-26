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

export function prepareImageScaledData(imageElement: HTMLImageElement, settings: Settings) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const scaledHeight = Math.ceil(imageElement.height / settings.textSize);
  const scaledWidth = Math.ceil(imageElement.width / settings.textSize);

  ctx!.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height, 0, 0, scaledWidth, scaledHeight);

  return {
    width: scaledWidth,
    height: scaledHeight,
    imageData: ctx!.getImageData(0, 0, scaledWidth, scaledHeight).data,
  };
}

export function prepareImageLettersData(imageElement: HTMLImageElement) {
  return {
    height: imageElement.height,
    width: imageElement.width,
    imageData: extractImageData(imageElement),
  };
}

export function createHref(renderer: HTMLCanvasElement | HTMLTextAreaElement | undefined) {
  console.debug("createHref: ", renderer);
  if (renderer instanceof HTMLCanvasElement) {
    return renderer.toDataURL();
  } else if (renderer instanceof HTMLTextAreaElement) {
    const blob = new Blob([renderer.value], { type: "text/plain" });
    return URL.createObjectURL(blob);
  }

  return "#";
}
