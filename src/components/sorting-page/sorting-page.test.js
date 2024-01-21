import { fireEvent, render, screen, waitFor} from '@testing-library/react';
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { DELAY_IN_MS } from "../../constants/delays";
import { SortingPage } from "./sorting-page";


const renderComponent = (arrLength) => {
    render(
        <BrowserRouter>
            <SortingPage arrLength={arrLength}/>
        </BrowserRouter>
    );
};

describe('sorting-page', () => {

    test('empty array', async () => {
        renderComponent(0);
        const ascendingButton = screen.getByText('По возрастанию');
        fireEvent.click(ascendingButton);

        // Ждем, пока массив будет отсортирован
        await waitFor(() => {
          const columns = screen.queryAllByTestId('arrElm');
          expect(columns.length).toBe(1);
        }, { timeout: 3000 });
    })
    test('array of one element', async () => {
        renderComponent(1);
        // Создаем массив из одного элемента
        const createArrayButton = screen.getByText('Новый массив');
        fireEvent.click(createArrayButton);

        const ascendingButton = screen.getByText('По возрастанию');
        fireEvent.click(ascendingButton);

        // Проверяем, что массив содержит один элемент
        const columns = await screen.findAllByTestId('arrElm');
        expect(columns).toHaveLength(1);
      });

    test('array of several elements.', async () => {
        renderComponent(3);
        // Создаем массив из нескольких элементов
        const createArrayButton = screen.getByText('Новый массив');
        fireEvent.click(createArrayButton);

        const ascendingButton = screen.getByText('По возрастанию');
        fireEvent.click(ascendingButton);

        // Проверяем, что массив содержит несколько элементов
        const columns = await screen.findAllByTestId('arrElm');
        expect(columns).not.toHaveLength(3);
    })
})