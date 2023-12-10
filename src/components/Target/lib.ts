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

const getAlphabetLetter = (averageColor: number, alphabet: string) => {
  const letterIndex = Math.floor((averageColor / 255) * alphabet.length);

  return alphabet[letterIndex];
};

export const convertImageToLetters = (settings: Settings, width: number, height: number, imageData: Uint8ClampedArray): Letter[][] => {
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
      const letter = getAlphabetLetter(averageColor, settings.alphabet);

      columnOfLetters.push({ letter, color });
    }

    letters.push(columnOfLetters);
  }

  return letters;
};
