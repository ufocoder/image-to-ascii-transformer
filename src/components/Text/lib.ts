import { IColoredLetter } from "../../types/targetTypes";

export const getText = (letters: IColoredLetter[][]): string => {
  let result = "";

  for (let row = 0; row < letters[0].length; row++) {
    for (let col = 0; col < letters.length; col++) {
      result += letters[col][row].letter;
    }

    if (row < letters[0].length - 1) result += "\n";
  }

  return result;
};
