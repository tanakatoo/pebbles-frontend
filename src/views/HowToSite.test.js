import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import HowToSite from './HowToSite';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});


describe('HowToSite', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <HowToSite />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <HowToSite />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});