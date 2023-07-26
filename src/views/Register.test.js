import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, renderWithProviders } from '../utils/testSetup';
import Register from './Register';
import App from '../App';
import { waitFor } from '../utils/testSetup';
import { act } from 'react-dom/test-utils';
import {
    server
} from '../utils/server';
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

describe('Register', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/register"]}>
                <App />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/register"]}>
                <App />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('valid user registration', async () => {
        const { findByTestId, findByLabelText, findByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/register"]}>
                <App />
            </MemoryRouter>
        );


        let elem = await findByLabelText('Username', { exact: false });
        fireEvent.change(elem, { target: { value: 'testUser' } });
        elem = await findByLabelText('Email', { exact: false });
        fireEvent.change(elem, { target: { value: 'testUser@test.com' } });
        elem = await findByLabelText('Password', { exact: true });
        fireEvent.change(elem, { target: { value: 'asdfasdf' } });
        elem = await findByLabelText('Re-enter password', { exact: false });
        fireEvent.change(elem, { target: { value: 'asdfasdf' } });

        // Submit form
        elem = await findByTestId(/registerBtn/)
        fireEvent.click(elem);

        // Are we on the edit?
        elem = await findByText(/Edit account/)
        expect(elem).toBeInTheDocument();

    });

    test('invalid user registration', async () => {
        const { findByTestId, findByLabelText, findByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/register"]}>
                <App />
            </MemoryRouter>
        );

        let elem = await findByLabelText('Username', { exact: false });
        fireEvent.change(elem, { target: { value: 'testUser' } });
        elem = await findByLabelText('Email', { exact: false });
        fireEvent.change(elem, { target: { value: 'testUser@test.com' } });
        elem = await findByLabelText('Password', { exact: true });
        fireEvent.change(elem, { target: { value: 'asdfasdf' } });
        elem = await findByLabelText('Re-enter password', { exact: false });
        fireEvent.change(elem, { target: { value: 'asdfasdf' } });

        // Submit form
        elem = await findByTestId(/registerBtn/)
        fireEvent.click(elem);
        server.use(
            rest.post('http://localhost:3001/auth/register', (req, res, ctx) => {
                console.log('MOCK invalid /auth/register');

                return res(ctx.json({
                    "error": {
                        "message": "INVALID_CREDENTIALS",
                        "status": 401
                    }
                }).status(401));
            }),
        )

        elem = await findByText(/Server error/)
        expect(elem).toBeInTheDocument();

    });
});