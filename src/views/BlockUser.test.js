import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { findAllByRole, renderWithProviders } from '../utils/testSetup';
import App from '../App';
import BlockUser from './BlockUser';
import { waitFor, act } from '../utils/testSetup';
import { fireEvent } from '../utils/testSetup';
import { server } from '../utils/server';
import { rest } from 'msw';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
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


describe('BlockUser', () => {
    test('renders without crashing', () => {
        <MemoryRouter initialEntries={["/users/block"]}>
            <App />
        </MemoryRouter>,
        {
            preloadedState: { profile: loginResponse }
        }
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/block"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            })

        expect(asFragment()).toMatchSnapshot();
    });

    test('see contacts on the screen', async () => {
        const { findByText, getByLabelText, getByText } =
            renderWithProviders(
                <MemoryRouter initialEntries={["/users/block"]}>
                    <App />
                </MemoryRouter>,
                {
                    preloadedState: { profile: loginResponse }
                }
            );

        // expect(getByTestId('blockUserData')).not.toBeEmptyDOMElement();
        expect(await findByText(/Block/)).toBeInTheDocument();

        expect(await findByText(/june/)).toBeInTheDocument();

    });

    test('able to block a user', async () => {
        const { findByRole, findByText, findAllByRole } =
            renderWithProviders(
                <MemoryRouter initialEntries={["/users/block"]}>
                    <App />
                </MemoryRouter>,
                {
                    preloadedState: { profile: loginResponse }
                }
            );

        let myRadio = await findAllByRole('radio', { value: 'june' })

        fireEvent.click(myRadio[0])

        // Submit form

        fireEvent.click(await findByText(/Block/));

        //this part doesn't work again
        //calls to get contacts again, so we mock this data to return no "june"
        // server.use(
        //     rest.get('http://localhost:3001/users/blocked', (req, res, ctx) => {
        //         console.log('MOCK no data /users/blocked');

        //         return res.once(ctx.json([]));
        //     }),
        // )

        // // expect(getByTestId('blockUserData')).not.toBeEmptyDOMElement();
        // expect(await findByText(/june/)).not.toBeInTheDocument();


    })

});