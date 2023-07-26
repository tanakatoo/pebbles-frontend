import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { findByText, renderWithProviders } from '../utils/testSetup';
import Contact from './Contact';
import App from '../App';
import { waitFor } from '../utils/testSetup';
import { fireEvent } from '../utils/testSetup';
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


describe('Contact', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/contact"]}>
                <App />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/contact"]}>
                <App />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('when email is sent a message is shown on screen', async () => {
        const { findByTestId, getByText, findByText, findByLabelText } = renderWithProviders(
            <MemoryRouter initialEntries={["/contact"]}>
                <App />
            </MemoryRouter>
        );


        let elem = await findByLabelText('Your name', { exact: false });
        fireEvent.change(elem, { target: { value: 'hello' } });
        elem = await findByLabelText('Email', { exact: false });
        fireEvent.change(elem, { target: { value: 'hello@test.com' } });
        elem = await findByLabelText('Message', { exact: false });
        fireEvent.change(elem, { target: { value: 'The message to send you' } });

        // Submit form
        elem = await findByText(/Send/)
        fireEvent.click(elem);


        // Wait for pageText to be populated
        elem = await findByText(/comments or questions/)
        expect(elem).toBeInTheDocument();


    });

    test('when error, error is displayed on screen', async () => {
        server.use(...errorHandlers)
        const { getByTestId, findByText, findByLabelText } = renderWithProviders(
            <MemoryRouter initialEntries={["/contact"]}>
                <App />
            </MemoryRouter>
        );



        let elem = await findByLabelText('Your name', { exact: false });
        fireEvent.change(elem, { target: { value: 'hello' } });
        elem = await findByLabelText('Email', { exact: false });
        fireEvent.change(elem, { target: { value: 'hello@test.com' } });
        elem = await findByLabelText('Message', { exact: false });
        fireEvent.change(elem, { target: { value: 'The message to send you' } });

        // Submit form
        elem = await findByText(/Send/)
        fireEvent.click(elem);

        // Wait for pageText to be populated
        elem = await findByText(/Error sending your message/)
        expect(elem).toBeInTheDocument();


    });
});