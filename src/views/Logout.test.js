import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import Logout from './Logout';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});


describe('Logout', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <Logout />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <Logout />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});