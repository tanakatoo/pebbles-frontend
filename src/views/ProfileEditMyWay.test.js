import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { findByTestId, findByText, fireEvent, getByTestId, renderWithProviders } from '../utils/testSetup';
import ProfileEdit from './ProfileEdit';
import App from '../App';
import { waitFor } from '../utils/testSetup';
import { act, findByRole, getByText, queryByAttribute } from '@testing-library/react';
import { server } from '../utils/server'
import { errorHandlers } from '../utils/errorHandlers';
import Router from "react-router-dom";
import ProfileEditMyWay from './ProfileEditMyWay';

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
        study_buddy_types: [],
        study_buddy_active: false
    }
};

describe('Edit MyWay', () => {

    test('renders without crashing', () => {

        renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/myway"]}>
                {/* <Routes>
                    <Route path='' element={<Protected />}>
                        <Route path="/users/profile/edit/myway" element={<ProfileEditMyWay />} />
                    </Route>
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes> */}
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );
    });


    test('matches snapshot', async () => {

        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/myway"]}>
                {/* <Routes>
                    <Route path='' element={<Protected />}>
                        <Route path="/users/profile/edit/myway" element={<ProfileEditMyWay />} />
                    </Route>
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes> */}
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );

        expect(asFragment()).toMatchSnapshot();
    });




    test('not logged in user visits MyWay Edit page', async () => {
        const { findByText, getByTestId, getByLabelText, getByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/myway"]}>
                {/* <Routes>
                    <Route path='' element={<Protected />}>
                        <Route path="/users/profile/edit/myway" element={<ProfileEditMyWay />} />
                    </Route>
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes> */}
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
        expect(await findByText(/not logged in/)).toBeInTheDocument();
    });

    test('logged-in user visits myway Edit page', async () => {

        const { findByTestId, getByTestId, getByLabelText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/myway"]}>
                {/* <Routes>
                    <Route path='' element={<Protected />}>
                        <Route path="/users/profile/edit/myway" element={<ProfileEditMyWay />} />
                    </Route>
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes> */}
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );


        expect(await findByTestId('profileEditMyWay')).toBeInTheDocument();
    });

    test('logged-in English user visits myway Edit page', async () => {

        const { findByText, getByTestId, getByLabelText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/myway"]}>
                {/* <Routes>
                    <Route path='' element={<Protected />}>
                        <Route path="/users/profile/edit/myway" element={<ProfileEditMyWay />} />
                    </Route>
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes> */}
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );


        expect(await findByText(/MyWay is a service for Premium Japanese users/)).toBeInTheDocument();
    });

    test('editable fields are able to be saved', async () => {

        const { findByTestId, findByText, findByLabelText, getByLabelText, findByRole } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/myway"]}>
                {/* <Routes>
                    <Route path='' element={<Protected />}>
                        <Route path="/users/profile/edit/myway" element={<ProfileEditMyWay />} />
                    </Route>
                    <Route path="/users/:username" element={<Profile />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes> */}
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );

        //get to the Japanese page first
        let elem = await findByText("JA");
        fireEvent.click(elem)

        // //change dropdown box for language level
        // elem = await findByRole('checkbox', { name: 'goals', value: 'Vocabulary' });
        // fireEvent.click(elem);

        // elem = await findByText("Beginner");
        // fireEvent.click(elem)
        // expect(elem).toBeInTheDocument();

        //don't know how to change textarea value
        elem = await findByTestId('textarea');
        fireEvent.change(elem, { target: { value: 'My habits' } });

        elem = await findByTestId('mywayDropdown')
        fireEvent.change(elem, { target: { value: "Beginner" } })

        elem = await findByTestId('save')
        fireEvent.click(elem)


        // jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
        //we are redirected to the profile page
        let japOnly = await findByText(/Sorry this section is only/)
        expect(japOnly).toBeInTheDocument()

    });

});