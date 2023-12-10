type Scale = "pixel-to-letter" | "same-size";

interface Settings {
  colored: boolean;
  backgroundColor: string;
  textColor: string;
  textSize: number;
  alphabet: string;
  scale: Scale;
  invertColors: boolean;
}

type Target = "canvas" | "textarea";

interface Letter {
  letter: string;
  color: string;
}

interface SelectOption {
  title: string;
  value: Scale;
}
