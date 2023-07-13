import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import NotFound404 from './NotFound404';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});


describe('NotFound404', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <NotFound404 />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <NotFound404 />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});