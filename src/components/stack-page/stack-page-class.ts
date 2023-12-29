import { ElementStates } from "../../types/element-states";

type TLetter = {
  value: string;
  state: ElementStates;
}

export class Stack<T> {

    private arrResult: TLetter[] = []
    constructor() {
        this.arrResult = []
    }

    push(item: TLetter) {
        this.arrResult.push(item)
    }

    pop() {
        this.arrResult.pop()
    }

    clear() {
        this.arrResult = []
    }

    getArray() {
        return this.arrResult
    }

    getSize() {
        return this.arrResult.length
    }
}