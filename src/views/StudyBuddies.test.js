import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import StudyBuddies from './StudyBuddies';
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


describe('StudyBuddies', () => {
    // test('renders without crashing', () => {
    //     renderWithProviders(
    //         <MemoryRouter>
    //             <StudyBuddies />
    //         </MemoryRouter>
    //     );
    // });

    // test('matches snapshot', async () => {
    //     const { asFragment } = renderWithProviders(
    //         <MemoryRouter>
    //             <StudyBuddies />
    //         </MemoryRouter>
    //     );

    //     expect(asFragment()).toMatchSnapshot();
    // });

    // test('displays no study buddies', async () => {
    //     const { getByTestId, getByLabelText, getByText } = renderWithProviders(
    //         <MemoryRouter>
    //             <StudyBuddies />
    //         </MemoryRouter>
    //     );

    //     // Wait for pageText to be populated
    //     await act(() => {
    //         waitFor(async () => {
    //             await expect(getByTestId('pageTitle')).not.toBeEmptyDOMElement();
    //             await expect(getByText(/widen your search/)).toBeInTheDocument();
    //         });
    //     })
    // });

    test('displays 1 study buddy when click goes to study buddy page', async () => {
        server.use(...withDataHandlers)

        const { getByTestId, getByLabelText, getByText } =
            renderWithProviders(
                <MemoryRouter>
                    <StudyBuddies />
                </MemoryRouter>
            );

        // Wait for pageText to be populated
        await waitFor(() => {
            expect(getByTestId('pageTitle')).not.toBeEmptyDOMElement();
            expect(getByText(/Volunteer/)).toBeInTheDocument();
            //There should not be any study buddies
            expect(getByText(/hello/)).toBeInTheDocument();
        });

        // Click on study buddy
        await act(async () => {
            fireEvent.click(await getByText(/hello/));
            expect(getByTestId('profileUsername')).not.toBeEmptyDOMElement();
        })

        // Wait for pageText to be populated
        await waitFor(() => {

        });

    });


});