import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import Search from './Search';
import { fireEvent, waitFor } from '../utils/testSetup';
import { act } from 'react-dom/test-utils';
import App from '../App';
import userEvent from '@testing-library/user-event'


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});

beforeEach(async () => {
    window.localStorage.clear()

})

afterEach(() => {
    window.localStorage.clear()
})

describe('Search', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/search"]}>
                <App />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/search"]}>
                <App />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('search results display', async () => {
        const { findByText, findByTestId, findByRole } = renderWithProviders(
            <MemoryRouter initialEntries={["/search"]}>
                <App />
            </MemoryRouter>
        );

        let elem = await findByTestId('searchinput');
        fireEvent.change(elem, { target: { value: 'hello' } })
        // fireEvent.keyDown(elem, { key: 'Enter', code: 'Enter', charCode: 13 })
        elem = await findByTestId('searchForm')
        fireEvent.submit()

        // Wait for pageText to be populated
        elem = await findByTestId('results');
        expect(elem).toBeInTheDocument();

        elem = await findByRole('textbox');
        expect(elem.innerHTML).toEqual('');
        elem = await findByText('helloo');
        expect(elem).toBeInTheDocument();


    })

});


