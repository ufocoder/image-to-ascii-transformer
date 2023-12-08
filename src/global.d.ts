interface Settings {
    colored: boolean;
    backgroundColor: string;
    textColor: string;
    textSize: number;
    alphabet: string;
}

type Target = "canvas" | "textarea";

interface Letter {
    letter: string;
    color: string;
}
