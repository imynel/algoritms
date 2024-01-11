import { fireEvent, render, screen, waitFor} from '@testing-library/react';
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { DELAY_IN_MS } from "../../constants/delays";
import { SortingPage } from "./sorting-page";


const renderComponent = () => {
    render(
        <BrowserRouter>
            <SortingPage />
        </BrowserRouter>
    );
};

describe('sorting-page', () => {

    beforeEach(() => {
        renderComponent();
    });

    test('empty array', () => {
        const button = screen.getByTestId('button')
        expect(button).toBeDisabled()
    })
    test('array of one element', async () => {
        const inputElement = screen.getByTestId('input');
        fireEvent.change(inputElement, { target: { value: 1 } });
        const buttonElement = screen.getByTestId('button');
        fireEvent.click(buttonElement);

        console.log(screen.getByTestId('arrElm').debug());


        await waitFor(() => {
            expect(screen.getByTestId('arrElm')).toBeInTheDocument();
        }, { timeout: DELAY_IN_MS * 2 });
      });

    test('array of several elements.', async () => {
        const arr = screen.queryAllByTestId('arrElm').map(item => item.textContent);
        const sortedArr = [...arr].sort((a, b) => a - b);

        const buttonElement = screen.getByTestId('button');
        fireEvent.click(buttonElement);

        await waitFor(() => {
            const newArr = screen.queryAllByTestId('arrElm').map(item => item.textContent);
            expect(newArr).toStrictEqual(sortedArr);
        }, { timeout: DELAY_IN_MS * 2 });
    })
})