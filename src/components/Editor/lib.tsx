import { decompressFrames, parseGIF } from "gifuct-js";
import { convertImageToLetters, frameToImage, prepareImageLettersData, prepareImageScaledData } from "@app/lib/target";

export async function createFrameLetters(container: ImageContainer, settings: Settings): Promise<LetterFrame[]> {
    if (container.mime === "image/gif") {
        const gif = parseGIF(container.buffer);
        const frames = decompressFrames(gif, true);

        const scale = settings.scale == "same-size";
        const canvas = document.createElement('canvas');
        const baseFrame = frames[0];

        canvas.width = baseFrame.dims.left + baseFrame.dims.width;
        canvas.height = baseFrame.dims.top + baseFrame.dims.height;

        const letterFrames = Promise.all(frames.map(async frame => {
            const element = await frameToImage(canvas, frame);
            const { width, height, imageData } = scale
                ? prepareImageScaledData(element, settings)
                : prepareImageLettersData(element);

            const letters = convertImageToLetters(settings, width, height, imageData!);

            return {
                delay: frame.delay,
                letters
            };
        }));

        return letterFrames;
    }

    const { width, height, imageData } = settings.scale == "same-size"
        ? prepareImageScaledData(container.element, settings)
        : prepareImageLettersData(container.element);

    const letters = convertImageToLetters(settings, width, height, imageData);

    return [
        { letters, delay: 0 }
    ];
}