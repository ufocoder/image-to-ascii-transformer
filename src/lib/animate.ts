import { ParsedFrame } from "gifuct-js";

interface LetterFrame {
    delay: number;
    letters: Letter[][];
}

export function createAnimation(letterFrames: LetterFrame[], setLetters: (letters: Letter[][]) => void) {
    var playing = false
    var loadedFrames = letterFrames;
    var frameIndex = 0;

      
    function renderFrame() {
        // get the frame
        var frame = loadedFrames[frameIndex]
        var start = new Date().getTime()
        
        setLetters(frame.letters)
    
        frameIndex++
        if (frameIndex >= loadedFrames.length) {
            frameIndex = 0
        }
    
        var end = new Date().getTime()
        var diff = end - start
    
        if (playing) {
            setTimeout(function() {
                requestAnimationFrame(renderFrame)
            }, Math.max(0, Math.floor(frame.delay - diff)))
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
