import { decompressFrames, parseGIF } from "gifuct-js";
import { createProcessingCanvas } from "@app/lib/canvas";
import { convertImageToLetters, createGifFrameComposer, prepareFrameData, prepareImageLettersData, prepareImageScaledData } from "@app/lib/target";

export async function createFrameLetters(container: ImageContainer, settings: Settings): Promise<LetterFrame[]> {
    const textSize = settings.textSize;
    const scale = settings.scale;

    if (container.mime === "image/gif") {
        const gif = parseGIF(container.buffer);
        const frames = decompressFrames(gif, true);

        const canvas = createProcessingCanvas(gif.lsd.width, gif.lsd.height);

        const composeFrame = createGifFrameComposer(canvas);
        const letterFrames: LetterFrame[] = [];

        for (const frame of frames) {
            const composedFrame = composeFrame(frame);
            const { width, height, imageData } = prepareFrameData(composedFrame, textSize, scale);

            const letters = convertImageToLetters(settings, width, height, imageData);

            letterFrames.push({
                delay: frame.delay,
                letters
            });
        }

        return letterFrames;
    }

    const { width, height, imageData } = scale == "same-size"
        ? prepareImageScaledData(container.element, textSize)
        : prepareImageLettersData(container.element);

    const letters = convertImageToLetters(settings, width, height, imageData);

    return [
        { letters, delay: 0 }
    ];
}
