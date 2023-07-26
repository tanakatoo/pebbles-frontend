import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { findByTestId, fireEvent, renderWithProviders } from '../utils/testSetup';
import ProfileEditMain from './ProfileEditMain';
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

beforeEach(() => {
    window.localStorage.clear()
})

afterEach(() => {
    window.localStorage.clear()
})

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
describe('Profile', () => {
    test('renders without crashing', () => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
        renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );
    });

    test('matches snapshot', async () => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('not logged in user visits Profile Edit Main Menu page', async () => {


        const { findByText, getByTestId, getByLabelText, getByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: {
                    profile: {
                        token: null,
                        profile: null
                    }
                }
            }
        );


        //error screen
        expect(await findByText(/You are not logged in/)).toBeInTheDocument();
    });

    // this works
    test('logged-in user visits Profile Edit Main Menu page', async () => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
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

    // this works
    test('logged-in user clicks Profile takes them to edit profile page', async () => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
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

        // Are we on Profile Edit Main Menu page?
        expect(await findByText(/Edit account/)).toBeInTheDocument();

        fireEvent.click(await findByText(/Profile/))
        // Are we on Profile Edit page?
        expect(await findByText(/Edit profile/)).toBeInTheDocument();

    });


    test('logged-in user clicks Study buddy takes them to edit study buddy page', async () => {

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

        const { findByText, findByTestId, getByLabelText, getByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );

        // Are we on Profile Edit Main Menu page?
        // expect(await findByText(/Edit account/)).toBeInTheDocument();
        let clickOnMe = await findByTestId(/profileEditMainStudyBuddy/)
        fireEvent.click(clickOnMe)
        // Are we on Profile Edit page?
        expect(await findByText(/Edit Study buddy/)).toBeInTheDocument();

    });


    test('logged-in user on the JA page clicks MyWay takes them to edit MyWay page', async () => {

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

        const { findByText, findByTestId, getByLabelText, getByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );


        // expect(await findByText(/Edit account/)).toBeInTheDocument();
        let clickonJA = await findByText(/JA/)
        fireEvent.click(clickonJA)
        let clickOnMe = await findByTestId(/profileEditMainMyWay/)
        fireEvent.click(clickOnMe)
        // Are we on Profile Edit page?
        expect(await findByTestId(/profileEditMyWay/)).toBeInTheDocument();

    });

    test('logged-in user on the JA page clicks MyWay and then clicks EN ', async () => {

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

        const { findByText, findByTestId, getByLabelText, getByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );


        // expect(await findByText(/Edit account/)).toBeInTheDocument();
        let clickonJA = await findByText(/JA/)
        fireEvent.click(clickonJA)
        let clickOnMe = await findByTestId(/profileEditMainMyWay/)
        fireEvent.click(clickOnMe)
        // expect(await findByText(/Edit account/)).toBeInTheDocument();
        let clickonEN = await findByText(/EN/)
        fireEvent.click(clickonEN)
        // Are we on Profile Edit page?
        expect(await findByText(/MyWay is a service for/)).toBeInTheDocument();

    });

});