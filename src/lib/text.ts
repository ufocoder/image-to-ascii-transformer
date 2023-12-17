export const getText = (letters: Letter[][]): string => {
  let result = "";

  for (let row = 0; row < letters[0].length; row++) {
    for (let col = 0; col < letters.length; col++) {
      result += letters[col][row].letter;
    }

    if (row < letters[0].length - 1) result += "\n";
  }

  return result;
};

export function createLink(text: string) {
  const link = document.createElement("a");
  const textFileAsBlob = new Blob([text], { type: "text/plain" });

  link.download = "image-from-textarea.txt";
  link.href = window.URL.createObjectURL(textFileAsBlob);
  link.textContent = "Download text from textarea";

  return link;
}
