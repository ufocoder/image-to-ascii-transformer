import { Setter } from "solid-js";
import { convertImageToLetters, frameToImage, prepareImageLettersData, prepareImageScaledData } from "@app/lib/target";
import { decompressFrames, parseGIF } from "gifuct-js";
import { getMimeType } from "@app/lib/mime";
import { createAnimation } from "@app/lib/animate";

interface LetterFrame {
    delay: number;
    letters: Letter[][];
}

export default async function generateLetters(container: ImageContainer, settings: Settings, setLetters: Setter<Letter[][]>) {
    const mimeType = await getMimeType(new Blob([container.buffer]));

    if (mimeType === "image/gif") {
        const gif = parseGIF(container.buffer);
        const frames = decompressFrames(gif, true);

        const canvas = document.createElement('canvas');

        canvas.width = frames[0].dims.left + frames[0].dims.width;
        canvas.height = frames[0].dims.top + frames[0].dims.height;

        const letterFrames: LetterFrame[] = [];

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
//
        const { start, stop } = createAnimation(letterFrames, setLetters);

        start();
        // @TODO: use stop on unmount
    } else {
        const { width, height, imageData } = settings.scale == "same-size"
            ? prepareImageScaledData(container.element, settings)
            : prepareImageLettersData(container.element);

        const letters = convertImageToLetters(settings, width, height, imageData);

        setLetters(letters);
    }
}