import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import Dashboard from './Dashboard';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});


describe('Dashboard', () => {
    // test('renders without crashing', () => {
    //     renderWithProviders(
    //         <MemoryRouter>
    //             <Dashboard />
    //         </MemoryRouter>
    //     );
    // });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});