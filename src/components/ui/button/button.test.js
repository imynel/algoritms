import { text } from "stream/consumers";
import { Button } from "./button";
import { fireEvent, render } from "@testing-library/react";

describe('button', () => {
    test('correctness of calling the callback when the button is pressed', () => {
        const onClick = jest.fn()
        const { getByText } = render(<Button text='Click me' onClick={onClick}/>)
        fireEvent.click(getByText('Click me'))
        expect(onClick).toHaveBeenCalled()
    })

    test('button with text ', () => {
        const button = render(<Button text="text" />);
        // Создаем snapshot
        expect(button).toMatchSnapshot();
    })

    test('button with not text', () => {
        const button = render(<Button />)
        expect(button).toMatchSnapshot()
    })

    test('button with disabled', () => {
        const button = render(<Button disabled={true} />)
        expect(button).toMatchSnapshot()
    })

    test('button with Loader', () => {
        const button = render(<Button isLoader={true} />)
        expect(button).toMatchSnapshot()
    })
    
})