import { decompressFrames, parseGIF } from "gifuct-js";
import { convertImageToLetters, frameToImage, prepareImageLettersData, prepareImageScaledData } from "@app/lib/target";
import { getMimeType } from "@app/lib/mime";
import { LetterFrame } from "./types";

export default async function generateLetters(container: ImageContainer, settings: Settings): Promise<LetterFrame[]> {
    const mimeType = await getMimeType(new Blob([container.buffer]));

    if (mimeType === "image/gif") {
        const gif = parseGIF(container.buffer);
        const frames = decompressFrames(gif, true);

        const letterFrames: LetterFrame[] = [];        
        const canvas = document.createElement('canvas');
        const baseFrame = frames[0];

        canvas.width = baseFrame.dims.left + baseFrame.dims.width;
        canvas.height = baseFrame.dims.top + baseFrame.dims.height;

        frames.forEach(frame => {
            const element = frameToImage(canvas, frame);

            const { width, height, imageData } = settings.scale == "same-size"
                ? prepareImageScaledData(element, settings)
                : prepareImageLettersData(element);

            const letters = convertImageToLetters(settings, width, height, imageData);

            letterFrames.push({
                delay: frame.delay,
                letters
            });
        });

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