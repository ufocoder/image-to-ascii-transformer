export function createAnimation(letterFrames: LetterFrame[], onTick: (letters: Letter[][]) => void) {
    const frames = letterFrames;
    const delays = frames.map((frame) => Math.max(10, frame.delay || 100));
    const duration = delays.reduce((total, delay) => total + delay, 0);

    let animationFrame: number | undefined;
    let startedAt = 0;
    let renderedFrameIndex = -1;

    function getFrameIndex(elapsed: number) {
        let position = elapsed % duration;

        for (let index = 0; index < delays.length; index++) {
            if (position < delays[index]) {
                return index;
            }

            position -= delays[index];
        }

        return frames.length - 1;
    }

    function renderFrame(now: number) {
        const frameIndex = getFrameIndex(now - startedAt);

        if (frameIndex !== renderedFrameIndex) {
            renderedFrameIndex = frameIndex;
            onTick(frames[frameIndex].letters);
        }

        animationFrame = requestAnimationFrame(renderFrame);
    }

    return {
        start: () => {
            startedAt = performance.now();
            renderedFrameIndex = 0;
            onTick(frames[0].letters);
            animationFrame = requestAnimationFrame(renderFrame);
        },
        stop: () => {
            if (animationFrame !== undefined) {
                cancelAnimationFrame(animationFrame);
                animationFrame = undefined;
            }
        }
    }
}
