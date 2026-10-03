import { GifWriter } from "omggif";
import { drawLetters } from "./lib";

const TRANSPARENT_INDEX = 0;

const palette = Array.from({ length: 256 }, (_, index) => {
  if (index <= 1) {
    return 0x000000;
  }

  const red = Math.round(((index >> 5) & 0x07) * 255 / 7);
  const green = Math.round(((index >> 2) & 0x07) * 255 / 7);
  const blue = Math.round((index & 0x03) * 255 / 3);

  return (red << 16) | (green << 8) | blue;
});

const getPaletteIndex = (red: number, green: number, blue: number) => {
  const index = ((red >> 5) << 5) | ((green >> 5) << 2) | (blue >> 6);

  return index === TRANSPARENT_INDEX ? 1 : index;
};

const getIndexedPixels = (imageData: ImageData) => {
  const pixels = Array.from<number>({ length: imageData.width * imageData.height });

  for (let sourceIndex = 0, pixelIndex = 0; sourceIndex < imageData.data.length; sourceIndex += 4, pixelIndex++) {
    const alpha = imageData.data[sourceIndex + 3];

    pixels[pixelIndex] = alpha < 128
      ? TRANSPARENT_INDEX
      : getPaletteIndex(
        imageData.data[sourceIndex],
        imageData.data[sourceIndex + 1],
        imageData.data[sourceIndex + 2],
      );
  }

  return pixels;
};

export const encodeGif = (frames: LetterFrame[], settings: Settings) => {
  const ratio = settings.textSize;
  const width = frames[0].letters.length * ratio;
  const height = frames[0].letters[0].length * ratio;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true })!;

  canvas.width = width;
  canvas.height = height;

  const framePixels = width * height;
  const buffer = new Uint8Array((framePixels * frames.length * 2) + (frames.length * 1024) + 4096);
  const writer = new GifWriter(buffer, width, height, { loop: 0, palette });

  for (const frame of frames) {
    context.clearRect(0, 0, width, height);
    drawLetters(context, settings, frame.letters);

    const imageData = context.getImageData(0, 0, width, height);
    const indexedPixels = getIndexedPixels(imageData);

    writer.addFrame(0, 0, width, height, indexedPixels, {
      delay: Math.max(1, Math.round((frame.delay || 100) / 10)),
      disposal: 2,
      transparent: TRANSPARENT_INDEX,
    });
  }

  return new Blob([buffer.subarray(0, writer.end())], { type: "image/gif" });
};
