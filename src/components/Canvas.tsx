import { Accessor, createEffect, createSignal, onMount } from "solid-js";

interface CanvasProps {
    image: Accessor<HTMLImageElement>;
    settings: Accessor<Settings>;
}
 
const getAverageColor = (imageData: Uint8ClampedArray, x: number, y: number) => {
    const index = (x + y) * 4;

    const r = imageData[index + 0];
    const g = imageData[index + 1];
    const b = imageData[index + 2];

    return  (r + g + b) / 3;
};


const getAlphabetLetter = (averageColor: number, alphabet: string) => {
    const letterIndex = Math.floor(averageColor / 255 * alphabet.length);

    return alphabet[letterIndex];
}


export default function Canvas(props: CanvasProps) {
    const [pixels, setPixels] = createSignal<Uint8ClampedArray>();

    let canvas: HTMLCanvasElement | undefined;

    
    createEffect(() => {
        draw();
    })

    // prepare canvas: 
    // 1. default size based image size
    // 2. styles
    // 3. save image pixels 
    // 4. draw
    const prepare = () => {

        if (!canvas || !props.image()) {
            return
        }
          
        const context = canvas.getContext("2d");
  
        if (!context) {
            return
        }
 
        const ratio  = props.settings().textSize;
        const height = props.image().height;
        const width = props.image().width;

        canvas.height = height;
        canvas.width = width;

        context.drawImage(props.image(), 0, 0);
        
        const imageData = context.getImageData(0, 0, width, height).data;

        setPixels(imageData);

        canvas.height = height * ratio;
        canvas.width = width * ratio;
    }

    // draw
    // get image pixels 
    // proccess
    // render
    const draw = () => {

        // original size: width, heigth
        // original pixel

        if (!canvas || !props.image() || !pixels()) {
            return
          }
          
          const context = canvas.getContext("2d");
  
          if (!context) {
              return
          }

        // fill background
        const ratio  = props.settings().textSize;
        const height = props.image().height;
        const width = props.image().width;

        canvas.height = height * ratio;
        canvas.width = width * ratio;

        context.fillStyle = props.settings().backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // prepare text style
        context.fillStyle = props.settings().textColor;
        context.font = props.settings().textSize + 'px';
        context.textAlign = "center";
        context.textBaseline = "middle";

        // draw letters 
        
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {

                const x = i;
                const y = j * width;

                const averageColor = getAverageColor(pixels(), x, y);
                const letter = getAlphabetLetter(averageColor, props.settings().alphabet);

                context.fillStyle = props.settings().textColor;

                const size = props.settings().textSize;

                context.fillText(
                    letter,
                    i * size, 
                    j * size,
                );
            }
        }

        // original size: image.width, image.height
        // new size fontSize: image.width * fontSize, image.height * fontSize
        // 1x1 -> 12x12 (fontSize x fontSize)
        // 12x12 -> 1x1
    }

    onMount(() => {
        prepare();
        draw();
    });

    return (
        <canvas ref={canvas} width="256" height="256" />
    );
}
  