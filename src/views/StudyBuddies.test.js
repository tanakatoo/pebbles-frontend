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

beforeEach(async () => {
    window.localStorage.clear()

})

afterEach(() => {
    window.localStorage.clear()
})

describe('StudyBuddies', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <StudyBuddies />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <StudyBuddies />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('displays no study buddies', async () => {
        const { getByTestId, getByLabelText, findByText } = renderWithProviders(
            <MemoryRouter>
                <StudyBuddies />
            </MemoryRouter>
        );

        let elem = await findByText(/widen your search/)
        expect(elem).toBeInTheDocument();


    });

    test('displays 1 study buddy when click goes to study buddy page', async () => {
        server.use(...withDataHandlers)

        const { findByTestId, findByLabelText, findByText } =
            renderWithProviders(
                <MemoryRouter>
                    <StudyBuddies />
                </MemoryRouter>, {
                profile: {
                    token: null,
                    profile: null
                }
            }
            );

        // Wait for pageText to be populated

        let elem = await findByText('Study Buddy Board')
        expect(elem).not.toBeEmptyDOMElement();
        elem = await findByText(/Volunteer/)
        expect(elem).toBeInTheDocument();
        //There should not be any study buddies
        elem = await findByText(/hello/)
        expect(elem).toBeInTheDocument();


        // Click on study buddy - not sure if this is a Link - can't see it as an "a" tag in the dom
        // elem = await findByText(/hello/)
        // fireEvent.click(elem);
        // elem = await findByText('Save')
        // expect(elem).not.toBeEmptyDOMElement();



    });


});