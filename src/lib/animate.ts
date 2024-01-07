import { LetterFrame } from "@app/components/Target/types";

export function createAnimation(letterFrames: LetterFrame[], onTick: (letters: Letter[][]) => void) {
    const frames = letterFrames;
    let frameIndex = 0;
    let playing = false;
      
    function renderFrame() {
        const frame = frames[frameIndex];
        const start = new Date().getTime();
        
        onTick(frame.letters);
    
        frameIndex++;
        if (frameIndex >= frames.length) {
            frameIndex = 0;
        }
    
        const end = new Date().getTime();
        const diff = end - start;
    
        if (playing) {
            setTimeout(function() {
                requestAnimationFrame(renderFrame);
            }, Math.max(0, Math.floor(frame.delay - diff)));
        }
    }

    return {
        start: () => {
            playing = true;
            renderFrame();
        },
        stop: () => {
            playing = false;
        }
    }
}
