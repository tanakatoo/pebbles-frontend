import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, renderWithProviders } from '../utils/testSetup';
import ChangePassword from './ChangePassword';
import App from '../App';
import { waitFor } from '../utils/testSetup';
import { act } from 'react-dom/test-utils';
import { server } from '../utils/server'
import { errorHandlers } from '../utils/errorHandlers';



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

describe('ChangePassword', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/change-password"]}>
                <App />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/change-password"]}>
                <App />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });


    test('valid email', async () => {
        const { getByTestId, findByLabelText, findByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/change-password"]}>
                <App />
            </MemoryRouter>
        );


        let elem = await findByLabelText('Email or username', { exact: false });
        fireEvent.change(elem, { target: { value: 'hello' } });

        elem = await findByText(/Submit/)
        fireEvent.click(elem);
        elem = await findByText(/has been sent/)
        expect(elem).toBeInTheDocument();


    });

    test('works with logged in users', async () => {
        const { getByTestId, findByLabelText, findByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/change-password"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );


        let elem = await findByLabelText('Email or username', { exact: false });
        fireEvent.change(elem, { target: { value: 'hello' } });

        elem = await findByText(/Submit/)
        fireEvent.click(elem);
        elem = await findByText(/has been sent/)
        expect(elem).toBeInTheDocument();


    });



});