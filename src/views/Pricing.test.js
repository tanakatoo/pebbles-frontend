import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import Pricing from './Pricing';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});


describe('Pricing', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <Pricing />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <Pricing />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});