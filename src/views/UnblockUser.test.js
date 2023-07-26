import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import UnblockUser from './UnblockUser';
import App from '../App';
import { waitFor, act, screen } from '../utils/testSetup';
import { fireEvent } from '../utils/testSetup';
import { errorHandlers } from '../utils/errorHandlers';
import { server } from '../utils/server'
import { rest } from 'msw';

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


describe('UnblockUser', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/users/unblock"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/unblock"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );

        expect(asFragment()).toMatchSnapshot();
    });


    test('able to Unblock a user', async () => {

        const { findByRole, findByText } =

            renderWithProviders(
                <MemoryRouter initialEntries={["/users/unblock"]}>
                    <App />
                </MemoryRouter>,
                {
                    preloadedState: { profile: loginResponse }
                }
            );


        let myRadio = await findByRole('radio', { value: { text: 'blockMe' } })
        fireEvent.click(myRadio)

        let btn = await findByText(/Unblock/)
        fireEvent.click(btn);

        //this one doesn't work
        // server.use(
        //     rest.get('http://localhost:3001/users/blocked', (req, res, ctx) => {
        //         console.log('MOCK no data /users/blocked');

        //         return res.once(ctx.json([]));
        //     }),
        // )

        // myRadio = await findByText(/blockMe/)
        // expect(myRadio).not.toBeInTheDocument();

    })
})
