import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import LanguageTown from './LanguageTown';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});


describe('LanguageTown', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <LanguageTown />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <LanguageTown />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});