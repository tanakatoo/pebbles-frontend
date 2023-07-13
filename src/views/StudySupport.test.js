import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import StudySupport from './StudySupport';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});


describe('StudySupport', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <StudySupport />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <StudySupport />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});