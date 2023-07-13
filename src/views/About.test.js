import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import About from './About';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});


describe('About', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <About />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <About />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});