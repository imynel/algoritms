import { ElementStates } from "../../types/element-states";

type TLetter = {
    value: string;
    state: ElementStates;
  }

export default class QueuePage {
    private arrResult: TLetter[];
    public head;
    public tail;

    constructor() {
        this.arrResult = [
            {value: '', state: ElementStates.Default}, 
            {value: '', state: ElementStates.Default}, 
            {value: '', state: ElementStates.Default}, 
            {value: '', state: ElementStates.Default}, 
            {value: '', state: ElementStates.Default}, 
            {value: '', state: ElementStates.Default}, 
            {value: '', state: ElementStates.Default}
        ]
        this.head = 0
        this.tail = 0
    }

    enqueue(item: TLetter) {
        this.arrResult[this.tail] = item
        this.tail++
    }

    dequeue() {
        if( this.head < this.tail) {
            this.arrResult[this.head] = {value: '', state: ElementStates.Default}
            this.head++
        }
        
    }

    clear() {
        this.arrResult = [
            {value: '', state: ElementStates.Default}, 
            {value: '', state: ElementStates.Default}, 
            {value: '', state: ElementStates.Default}, 
            {value: '', state: ElementStates.Default}, 
            {value: '', state: ElementStates.Default}, 
            {value: '', state: ElementStates.Default}, 
            {value: '', state: ElementStates.Default}
        ]
        this.head = 0
        this.tail = 0
    }

    getArray() {
        return this.arrResult
    }
}