import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, renderWithProviders } from '../utils/testSetup';
import Profile from './Profile';
import App from '../App';
import { waitFor } from '../utils/testSetup';
import { act } from 'react-dom/test-utils';
import { server } from '../utils/server'
import { errorHandlers } from '../utils/errorHandlers';
import Router from "react-router-dom";

// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

beforeEach(async () => {
    window.localStorage.token = null
    const { getByTestId, getByLabelText, findByText } = renderWithProviders(
        <MemoryRouter >
            <App />
        </MemoryRouter>
    );

    // Populate form
    let changeLang = await findByText('EN', { exact: true });
    fireEvent.click(changeLang);


})

afterEach(() => {
    window.localStorage.token = null
})


describe('Profile', () => {
    test('renders without crashing', () => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
        renderWithProviders(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    // test('edit button goes to edit page', async () => {
    //     jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
    //     const { getByTestId, getByLabelText, getByText } = await renderWithProviders(
    //         <MemoryRouter>
    //             <Profile />
    //         </MemoryRouter>
    //     );


    //     // Submit form
    //     await act(async () => {
    //         fireEvent.click(await getByText(/Edit/));
    //         expect(getByText(/Edit account/)).toBeInTheDocument();
    //     })
    //     // fireEvent.click(getByTestId(/loginFormLogin/));

    //     // // Wait for pageText to be populated
    //     // await waitFor(() => {
    //     //     expect(getByTestId('wait-for-pagetext')).not.toBeEmptyDOMElement();
    //     // });

    //     // // Are we on the Dashboard page?
    //     // expect(getByText(/Learn how to use Pebbles/)).toBeInTheDocument();
    //     // //There should not be any study buddies
    //     // expect(getByText(/No study buddies yet! /)).toBeInTheDocument();
    // });

    test('logged-in user visits Profile Edit page', async () => {
        let loginResponse = {
            token: 'abcdefg',
            profile: {
                id: 2,
                username: 'hello',
                name: 'Hello World',
                email: "karmen.tanakaa@gmail.com",
                role: 'regular',
                premium_join_date: '',
                premium_end_date: '',
                free_trial_start_date: '',
                study_buddy_types: []
            }
        };

        const { findByText, getByTestId, getByLabelText, getByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );

        // Are we on Profile Edit page?
        expect(await findByText(/Edit account/)).toBeInTheDocument();
    });


});