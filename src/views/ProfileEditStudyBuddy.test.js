import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { findByTestId, findByText, fireEvent, getByTestId, renderWithProviders } from '../utils/testSetup';
import ProfileEdit from './ProfileEdit';
import App from '../App';
import { waitFor } from '../utils/testSetup';
import { act, getByText, queryByAttribute } from '@testing-library/react';
import { server } from '../utils/server'
import { errorHandlers } from '../utils/errorHandlers';
import Router from "react-router-dom";

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
        study_buddy_types: [],
        study_buddy_active: false
    }
};

describe('Edit Study buddy', () => {

    test('renders without crashing', () => {

        renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/study-buddy"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );
    });


    test('matches snapshot', async () => {

        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/study-buddy"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );

        expect(asFragment()).toMatchSnapshot();
    });




    test('not logged in user visits Study buddy Edit page', async () => {
        const { findByText, getByTestId, getByLabelText, getByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/study-buddy"]}>
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

    test('logged-in user visits Study buddy Edit page', async () => {

        const { findByText, getByTestId, getByLabelText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/study-buddy"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );


        // Are we on Profile Edit page?
        expect(await findByText(/Edit Study buddy/)).toBeInTheDocument();
    });

    test('editable fields are able to be saved', async () => {

        const { findByTestId, findByText, findByLabelText, getByLabelText, getByTestId } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/profile/edit/study-buddy"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );

        expect(await findByLabelText(/Join study buddy/)).toBeInTheDocument();

        // //not working - not sure why "checked" is not there
        // await act(async () => {
        //     //check the switch and then check and uncheck the study buddy types
        //     let elem = await findByTestId('studybuddyToggle');
        //     console.log(elem)
        //     fireEvent.click(elem);

        //     // //get element again this one not working
        //     elem = await findByTestId('studybuddyToggle');
        //     // console.log(elem)
        //     expect(elem).toHaveAttribute(
        //         "data-headlessui-state",
        //         "checked"
        //     );


        // })


        //change dropdown box for language level
        let elem = await findByTestId('languageLevel');
        fireEvent.click(elem);
        elem = await findByText("Beginner");
        fireEvent.click(elem)
        expect(elem).toBeInTheDocument();
        elem = getByLabelText('Why do you want to join', { exact: false });
        fireEvent.change(elem, { target: { value: 'Why I want to join' } });

        elem = await findByTestId('save')
        console.log(elem)
        fireEvent.click(elem)

        // jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })

        //we are redirected to the profile page
        let editLink = await findByText(/Edit/)
        expect(editLink).toBeInTheDocument()
        let backOnProfile = await findByText(/Join study buddy/)
        expect(backOnProfile).toBeInTheDocument()



    });

});