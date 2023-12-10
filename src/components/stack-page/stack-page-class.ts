export class Stack<T> {

    private arrResult: string[] = []
    constructor() {
        this.arrResult = []
    }

    push(item: string) {
        this.arrResult.push(item)
        console.log(this.arrResult)
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