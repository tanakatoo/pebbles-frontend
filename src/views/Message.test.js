import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { findByTestId, fireEvent, renderWithProviders } from '../utils/testSetup';
import App from '../App';
import { waitFor } from '../utils/testSetup';

import Router from "react-router-dom";
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';

// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});

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


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

describe('Message', () => {
    test('renders without crashing', async () => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
        renderWithProviders(
            <MemoryRouter initialEntries={["/messages/ktoo"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            });


    });

    test('matches snapshot', async () => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/messages/ktoo"]}>
                <App />
            </MemoryRouter>);
        expect(asFragment()).toMatchSnapshot();



    });


    test('add to conversation', async () => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
        const { findByTestId, findByRole, getByLabelText, findByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/messages/ktoo"]}>
                <App />
            </MemoryRouter >,
            {
                preloadedState: { profile: loginResponse }
            }
        );


        let elem = await findByRole('textbox');
        userEvent.type(elem, 'loremText')

        // fireEvent.keyDown(elem, { keyCode: 13 });

        await waitFor(() => {
            expect(elem).toHaveValue('loremText');
        });

        await act(async () => {
            elem = await findByTestId('send')
            fireEvent.click(elem)
        })

        expect(await findByText(/Last sent/)).toBeInTheDocument();
        //expect the textarea is empty, that means it went to on submit
        elem = await findByRole('textbox');
        // fireEvent.change(elem, { target: { value: 'hi' } });
        expect(elem.innerHTML).toEqual('');
    });
});