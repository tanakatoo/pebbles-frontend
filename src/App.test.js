import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from './utils/testSetup';
import App from './App';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});


describe('App', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});