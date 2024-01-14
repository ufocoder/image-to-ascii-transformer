type ImageContainer = {
  element: HTMLImageElement;
  mime: string;
  buffer: ArrayBuffer;
}

type Scale = "pixel-to-letter" | "same-size";

type Optional<T> = {
  [K in keyof T]?: T[K]
}


interface Settings {
  colored: boolean;
  backgroundColor: string;
  textColor: string;
  textSize: number;
  alphabet: string;
  scale: Scale;
  invertColors: boolean;
}

type Target = "canvas" | "text";

interface Letter {
  letter: string;
  color: string;
}

interface LetterFrame {
  delay: number;
  letters: Letter[][];
}

interface SelectOption {
  title: string;
  value: Scale;
}
