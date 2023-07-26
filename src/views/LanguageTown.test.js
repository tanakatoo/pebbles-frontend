import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import LanguageTown from './LanguageTown';
import App from '../App';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});


describe('LanguageTown', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/language-town"]}>
                <App />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/language-town"]}>
                <App />
            </MemoryRouter >
        );

        expect(asFragment()).toMatchSnapshot();
    });
});