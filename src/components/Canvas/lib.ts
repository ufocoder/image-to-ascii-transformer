export const extractImageData = (element: HTMLImageElement): Uint8ClampedArray => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext("2d");

    const height = element.height;
    const width = element.width;

    canvas.height = height;
    canvas.width = width;

    context!.drawImage(element, 0, 0);

    return context!.getImageData(0, 0, width, height).data;
}

export const getPixelAverageGrayscaleColor = (imageData: Uint8ClampedArray, x: number, y: number): number => {
    const index = (x + y) * 4;

    const r = imageData[index + 0];
    const g = imageData[index + 1];
    const b = imageData[index + 2];

    return  (r + g + b) / 3;
};

export const getPixelHexColor = (imageData: Uint8ClampedArray, x: number, y: number): string => {
    const index = (x + y) * 4;

    const r = imageData[index + 0];
    const g = imageData[index + 1];
    const b = imageData[index + 2];

    return  '#' + r.toString(16) + g.toString(16) + b.toString(16);
};


export const getAlphabetLetter = (averageColor: number, alphabet: string) => {
    const letterIndex = Math.floor(averageColor / 255 * alphabet.length);

    return alphabet[letterIndex];
}

const mergePixels = (
    imageData: Uint8ClampedArray,
    width: number,
    x: number, 
    y: number, 
    square: number
) => {
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

    r /= square**2;
    g /= square**2;
    b /= square**2;
    a /= square**2;

    return {
        r,
        g,
        b,
        a,
    }
}

export const drawFrame = (
    context: CanvasRenderingContext2D,
    settings: Settings,
    element: HTMLImageElement,
    imageData: Uint8ClampedArray,
) => {
    // fill background
    const ratio  = settings.textSize;
    const height = element.height;
    const width = element.width;

    context.fillStyle = settings.backgroundColor;
    context.fillRect(0, 0, width * ratio, height * ratio);

    // prepare text style
    context.fillStyle = settings.textColor;
    context.font = settings.textSize + 'px';
    context.textAlign = "center";
    context.textBaseline = "middle";

    // draw letters
    const step = 1;

    for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
            const { r, g, b } =  mergePixels(imageData, width, x, y, step);
            const averageColor = (r + g + b) / 3;
            const currentPixelColor = '#' + r.toString(16) + g.toString(16) + b.toString(16);
            const letter = getAlphabetLetter(averageColor, settings.alphabet);

            context.fillStyle = settings.colored 
                ? currentPixelColor
                : settings.textColor;

            context.fillText(
                letter,
                x / step * settings.textSize, 
                y / step * settings.textSize,
            );

        }
    }

}
