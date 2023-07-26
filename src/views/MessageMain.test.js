import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, renderWithProviders } from '../utils/testSetup';
import MessageMain from './MessageMain';
import App from '../App';
import { waitFor } from '../utils/testSetup';
import { act } from 'react-dom/test-utils';
import { server } from '../utils/server'
import { errorHandlers } from '../utils/errorHandlers';
import { actionLogin } from '../reducers/actionCreator';
import { useDispatch } from 'react-redux';
import { store } from '../utils/setupRedux';
import { LOGIN } from '../reducers/actionTypes';

// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});
// let loginResponse = {
//     token: 'abcdefg',
//     user: {
//         id: 2,
//         username: 'hello',
//         role: 'regular',
//         premium_join_date: '',
//         premium_end_date: '',
//         free_trial_start_date: '',
//     }
// }

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


beforeEach(async () => {
    window.localStorage.clear()

})

afterEach(() => {
    window.localStorage.clear()
})


describe('MessageMain', () => {
    test('renders without crashing', async () => {

        renderWithProviders(
            <MemoryRouter initialEntries={["/messages"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            });


    });

    test('matches snapshot', async () => {

        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/messages"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            });


        expect(asFragment()).toMatchSnapshot();


    });


    test('unread messages are orange and read are black', async () => {
        const { getByTestId, getByRole, getByLabelText, getByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/messages"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            });




        await waitFor(() => {
            expect(getByText(/june/)).toBeInTheDocument();
            expect(getByText(/ktoo/)).toBeInTheDocument();
            expect(getByText(/june/)).toHaveStyle('color: ');
            expect(getByText(/june/)).toHaveStyle('color: text-secondary-dark');
        });

    });

    // test that new conversations are first and different color

});