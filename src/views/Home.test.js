import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import Home from './Home';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});


describe('Home', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});