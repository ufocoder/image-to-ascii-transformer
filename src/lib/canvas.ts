export type ProcessingCanvas = HTMLCanvasElement | OffscreenCanvas;
export type ProcessingContext = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

export const createProcessingCanvas = (width: number, height: number): ProcessingCanvas => {
  if (typeof OffscreenCanvas !== "undefined") {
    return new OffscreenCanvas(width, height);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  return canvas;
};

export const getProcessingContext = (
  canvas: ProcessingCanvas,
  options?: CanvasRenderingContext2DSettings,
) => canvas.getContext("2d", options) as ProcessingContext | null;

export const processingCanvasToBlob = async (canvas: ProcessingCanvas, type: string) => {
  if (typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) {
    return canvas.convertToBlob({ type });
  }

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error("Unable to create image")),
      type,
    );
  });
};
