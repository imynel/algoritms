import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { StringComponent } from "./string";
import { BrowserRouter } from 'react-router-dom';
import { DELAY_IN_MS } from '../../constants/delays';

const renderComponent = () => {
    render(
        <BrowserRouter>
            <StringComponent />
        </BrowserRouter>
    );
};

const reversString = async (inputValue, expectedValues, timeout) => {
    const inputElement = screen.getByTestId('input');
    fireEvent.change(inputElement, { target: { value: inputValue } });

    const buttonElement = screen.getByTestId('button');
    fireEvent.click(buttonElement);

    await waitFor(() => {
        const circles = screen.getAllByTestId('circle');
        expectedValues.forEach((value, index) => {
            expect(circles[index]).toHaveTextContent(value.toString());
        });
    }, { timeout });
};


describe('String Component', () => {
    beforeEach(() => {
        renderComponent();
    });

    test('with even number оf characters', () => {
        reversString('123456', ['6', '5', '4', '3', '2', '1'], DELAY_IN_MS * 3)
        
    })
    test('with odd even number оf characters', () => {
        reversString('12345', ['5', '4', '3', '2', '1'], DELAY_IN_MS * 3)
    })
    test('with one characters', () => {
        reversString('1', ['1'], DELAY_IN_MS * 3)
    })
    test('empty line', () => {
        reversString('', [], DELAY_IN_MS * 3)
    })
})