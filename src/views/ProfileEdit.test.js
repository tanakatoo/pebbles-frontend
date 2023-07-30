import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { findByTestId, findByText, fireEvent, getByTestId, renderWithProviders } from '../utils/testSetup';
import ProfileEdit from './ProfileEdit';
import App from '../App';
import { waitFor } from '../utils/testSetup';
import { act, getByText } from '@testing-library/react';
import { server } from '../utils/server'
import { errorHandlers } from '../utils/errorHandlers';
import Router from "react-router-dom";
import { Routes } from "react-router-dom"
import Protected from '../components/common/Protected';
import Unauthorized from './Unauthorized';
import Profile from './Profile';

// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});

// jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-router-dom"),
//     useParams: jest.fn(),
// }));

beforeEach(async () => {
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

describe('Edit Profile', () => {

    test('renders without crashing', () => {

        renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/profile"]}>
                <App />
                {/* <Routes>
                    <Route path='' element={<Protected />}>
                        <Route path="/users/profile/edit/profile" element={<ProfileEdit />} />
                    </Route>
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes> */}
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );
    });


    test('matches snapshot', async () => {

        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/profile"]}>
                <App />
                {/*
                <Routes>
                    <Route path='' element={<Protected />}>
                        <Route path="/users/profile/edit/profile" element={<ProfileEdit />} />
                    </Route>
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes> */}
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );

        expect(asFragment()).toMatchSnapshot();
    });




    test('not logged in user visits Profile Edit page', async () => {


        const { findByText, getByTestId, getByLabelText, getByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/profile"]}>
                <App />
                {/* <Routes>
                    <Route path='' element={<Protected />}>
                        <Route path="/users/profile/edit/profile" element={<ProfileEdit />} />
                    </Route>
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes> */}
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

    test('logged-in user visits Profile Edit page', async () => {

        const { findByText, getByTestId, getByLabelText, getByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/profile"]}>
                <App />
                {/* <Routes>
                    <Route path='' element={<Protected />}>
                        <Route path="/users/profile/edit/profile" element={<ProfileEdit />} />

                    </Route>
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes> */}

            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );


        // Are we on Profile Edit page?
        expect(await findByText(/Edit profile/)).toBeInTheDocument();
    });

    test('editable fields are able to be saved and username is disabled', async () => {

        const { findByText, findByTestId, findByLabelText, getByLabelText, getByTestId } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/profile"]}>
                <App />
                {/* <Routes>
                    <Route path='' element={<Protected />}>
                        <Route path="/users/profile/edit/profile" element={<ProfileEdit />} />

                    </Route>
                    <Route path="/users/:username" element={<Profile />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes> */}
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );

        //first one doesn't get changed...why?

        expect(await findByText(/Edit profile/)).toBeInTheDocument();
        let elem = await findByLabelText('Email', { exact: true });
        fireEvent.change(elem, { target: { value: 'hello2@test.com' } });
        elem = await findByLabelText('About', { exact: true });
        fireEvent.change(elem, { target: { value: 'Hello2 about' } });
        elem = await findByLabelText('Name', { exact: true });
        fireEvent.change(elem, { target: { value: 'My name is hello' } });
        expect(await findByLabelText(/Username/)).toBeDisabled();

        elem = getByTestId('autocompleteInput');

        await act(async () => {
            fireEvent.change(elem, { target: { value: 'par' } });
            //see that dropdown has opened

            let dropdown = await findByTestId('autocompleteCombo');
            expect(dropdown).toHaveAttribute('data-headlessui-state', 'open')

        })

        elem = await findByText(/Save/)
        fireEvent.click(elem)
        // jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })

        //so this is not going to profile...? 

        //we are redirected to the profile
        let editLink = await findByText(/Edit/)
        expect(editLink).toBeInTheDocument()
        let backOnProfile = await findByText(/karmen.tanakaa@gmail.com/)
        expect(backOnProfile).toBeInTheDocument()



    });

});