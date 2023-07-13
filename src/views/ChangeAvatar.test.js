import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import ChangeAvatar from './ChangeAvatar';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});


describe('ChangeAvatar', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <ChangeAvatar />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <ChangeAvatar />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});