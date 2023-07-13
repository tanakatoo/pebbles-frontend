import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import InfoCenter from './InfoCenter';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});


describe('LanguageTown', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <InfoCenter />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <InfoCenter />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});