export default class QueuePage {
    private arrResult: string[];
    public head;
    public tail;

    constructor() {
        this.arrResult = ['', '' , '' , '' , '' , '', '']
        this.head = 0
        this.tail = 0
    }

    enqueue(item: string) {
        this.arrResult[this.tail] = item
        this.tail++
    }

    dequeue() {
        if( this.head < this.tail) {
            this.arrResult[this.head] = ''
            this.head++
        }
        
    }

    clear() {
        this.arrResult = ['', '' , '' , '' , '' , '', '']
        this.head = 0
        this.tail = 0
    }

    getArray() {
        return this.arrResult
    }
}