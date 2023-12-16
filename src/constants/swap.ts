import { ElementStates } from "../types/element-states";

type TLetter = {
  value: number;
  state: ElementStates;
}

export const swap = (arr: TLetter[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };