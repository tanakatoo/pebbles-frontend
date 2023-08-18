import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, renderWithProviders } from '../utils/testSetup';
import Login from './Login';
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

describe('Login', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/login"]}>
                <App />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/login"]}>
                <App />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('invalid user login', async () => {
        server.use(...errorHandlers)

        const { findByTestId, findByLabelText, findByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/login"]}>
                <App />
            </MemoryRouter>
        );


        let elem = await findByLabelText('Username or email', { exact: true });

        fireEvent.change(elem, { target: { value: 'helloo' } });
        elem = await findByLabelText('Password', { exact: false });
        fireEvent.change(elem, { target: { value: 'asdfasdf' } });

        // Submit form
        elem = await findByTestId(/loginFormLogin/)
        fireEvent.click(elem);

        // fireEvent.click(getByTestId(/loginFormLogin/));

        // Wait for pageText to be populated
        elem = await findByTestId('serverError')
        expect(elem).not.toBeEmptyDOMElement();
        elem = await findByText(/Server error/)
        expect(elem).toBeInTheDocument();

    });

    test('valid user login', async () => {
        const { findByTestId, findByLabelText, findByText } = await renderWithProviders(
            <MemoryRouter initialEntries={["/login"]}>
                <App />
            </MemoryRouter>
        );


        let elem = await findByLabelText('Username or email', { exact: false });
        fireEvent.change(elem, { target: { value: 'hello' } });
        elem = await findByLabelText('Password', { exact: false });
        fireEvent.change(elem, { target: { value: 'asdfasdf' } });

        // Submit form
        elem = await findByTestId(/loginFormLogin/)
        fireEvent.click(elem);

        //There should not be any study buddies
        expect(await findByText(/No study buddies yet! /)).toBeInTheDocument();
    });


});