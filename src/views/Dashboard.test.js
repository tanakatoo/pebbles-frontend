import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import Dashboard from './Dashboard';
import { waitFor } from '../utils/testSetup';
import { withDataHandlers } from '../utils/withDataHandlers';
import { server } from '../utils/server'
import { act } from 'react-dom/test-utils';
import { fireEvent } from '../utils/testSetup';
import { screen } from '../utils/testSetup';


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

    // test('matches snapshot', async () => {
    //     const { asFragment } = renderWithProviders(
    //         <MemoryRouter>
    //             <Dashboard />
    //         </MemoryRouter>
    //     );

    //     expect(asFragment()).toMatchSnapshot();
    // });

    // test('displays no study buddies', async () => {
    //     const { getByTestId, getByLabelText, getByText } = renderWithProviders(
    //         <MemoryRouter>
    //             <Dashboard />
    //         </MemoryRouter>
    //     );

    //     // Wait for pageText to be populated
    //     await waitFor(() => {
    //         expect(getByTestId('dashStudyBuddyNoData')).not.toBeEmptyDOMElement();
    //     });

    //     expect(getByText(/Learn how to use Pebbles/)).toBeInTheDocument();
    //     //There should not be any study buddies
    //     expect(getByText(/No study buddies yet! /)).toBeInTheDocument();
    // });

    test('displays 1 study buddy when click goes to study buddy page', async () => {
        server.use(...withDataHandlers)

        const { getByTestId, getByLabelText, getByText } =
            renderWithProviders(
                <MemoryRouter>
                    <Dashboard />
                </MemoryRouter>
            );

        // Wait for pageText to be populated
        await waitFor(() => {
            expect(getByTestId('dashStudyBuddyWithData')).not.toBeEmptyDOMElement();
        });

        expect(getByText(/Volunteer/)).toBeInTheDocument();
        //There should not be any study buddies
        expect(getByText(/hello/)).toBeInTheDocument();

        // Click on See All for study buddies

        await act(() => {
            fireEvent.click(getByText(/See all/));
        })

        // Wait for pageText to be populated
        await waitFor(() => {
            expect(getByTestId('pageTitlepageText')).not.toBeEmptyDOMElement();
        });

    });


});