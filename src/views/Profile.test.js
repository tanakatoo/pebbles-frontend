import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { findAllByText, findByLabelText, fireEvent, renderWithProviders } from '../utils/testSetup';
import Profile from './Profile';
import App from '../App';
import { waitFor } from '../utils/testSetup';
import { act } from 'react-dom/test-utils';
import { server } from '../utils/server'
import { errorHandlers } from '../utils/errorHandlers';
import Router from "react-router-dom";
import { useDispatch } from 'react-redux';
import { actionLogout } from '../reducers/actionCreator';
import { Routes, Route } from 'react-router-dom';

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
    window.localStorage.clear()


    // const { getByTestId, getByLabelText, findByText } = renderWithProviders(

    //     < MemoryRouter >
    //         <App />
    //     </MemoryRouter >,
    //     {
    //         preloadedState: {
    //             profile: {
    //                 token: null,
    //                 profile: null
    //             }
    //         }
    //     }
    // );

    // // Populate form
    // let changeLang = await findByText('EN', { exact: true });
    // fireEvent.click(changeLang);


})

afterEach(() => {
    window.localStorage.clear()
})


describe('Profile', () => {
    test('renders without crashing', async () => {
        // jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
        const { getByTestId, getByLabelText, findByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/hello"]}>
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

    });

    test('matches snapshot', async () => {
        // jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/hello"]}>
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

        expect(asFragment()).toMatchSnapshot();
    });


    // this one doesn't pass - it does if I comment out smoke test
    test('edit button goes to edit page', async () => {
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

        const { getByTestId, getByLabelText, findByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/hello"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );


        // Submit form
        let findBtn = await findByText(/Edit/);
        fireEvent.click(findBtn);
        //doens't seem like this one is clicked
        expect(await findByText(/Edit account/)).toBeInTheDocument();


    });

    test('logged-in user visits Profile Edit page', async () => {
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

        const { findByText, findAllByText, findByLabelText, getByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/hello"]}>

                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );


        // Are we on Profile page?
        expect(await findByText(/Edit/)).toBeInTheDocument();


    });


    // test('not logged-in user does not see edit button', async () => {
    //     jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'ktoo' })

    //     const { findByText, getByTestId, queryByText, getByText } = renderWithProviders(
    //         <MemoryRouter initialEntries={["/users/ktoo"]}>
    //             <App />
    //         </MemoryRouter>,
    //         {
    //             preloadedState: {
    //                 profile: {
    //                     token: null,
    //                     profile: null
    //                 }
    //             }
    //         }
    //     );


    //     // Are we on Profile page?
    //     expect(await findByText(/Profile/)).toBeInTheDocument();
    //     expect(queryByText(/Edit/)).not.toBeInTheDocument();
    // });

    // test('Click on study buddy tab see study buddy info', async () => {
    //     jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
    //     let loginResponse = {
    //         token: 'abcdefg',
    //         profile: {
    //             id: 2,
    //             username: 'hello',
    //             name: 'Hello World',
    //             email: "karmen.tanakaa@gmail.com",
    //             role: 'regular',
    //             premium_join_date: '',
    //             premium_end_date: '',
    //             free_trial_start_date: '',
    //             study_buddy_types: []
    //         }
    //     };

    //     const { findByText, findByTestId, getByTestId, getByText } = renderWithProviders(
    //         <MemoryRouter initialEntries={["/users/hello"]}>
    //             <App />
    //         </MemoryRouter>,
    //         {
    //             preloadedState: { profile: loginResponse }
    //         }
    //     );


    //     // Are we on Profile page?
    //     // expect(await findByText(/Study buddy/)).toBeInTheDocument();
    //     // Submit form

    //     let findTab = await findByTestId('profileTab3');
    //     fireEvent.click(findTab);
    //     //doens't seem like this one is clicked
    //     expect(await findByText(/Join study buddy/)).toBeInTheDocument();

    // });

    // test('For Japanese, users can click on the MyWay tab', async () => {
    //     jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
    //     let loginResponse = {
    //         token: 'abcdefg',
    //         profile: {
    //             id: 2,
    //             username: 'hello',
    //             name: 'Hello World',
    //             email: "karmen.tanakaa@gmail.com",
    //             role: 'regular',
    //             premium_join_date: '',
    //             premium_end_date: '',
    //             free_trial_start_date: '',
    //             study_buddy_types: []
    //         }
    //     };

    //     const { findByText, findByTestId, getByTestId, getByText } = renderWithProviders(
    //         <MemoryRouter initialEntries={["/users/hello"]}>
    //             <App />
    //         </MemoryRouter>,
    //         {
    //             preloadedState: { profile: loginResponse }
    //         }
    //     );


    //     // Are we on Profile page?
    //     // expect(await findByText(/Study buddy/)).toBeInTheDocument();
    //     // Submit form
    //     let findJA = await findByText("JA")
    //     fireEvent.click(findJA)
    //     let findTab = await findByTestId('profileTab2');
    //     fireEvent.click(findTab);
    //     //doens't seem like this one is clicked
    //     expect(await findByText(/Sorry this section/)).toBeInTheDocument();

    // });

});