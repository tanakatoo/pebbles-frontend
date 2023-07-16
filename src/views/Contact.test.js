import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import Contact from './Contact';
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


describe('Contact', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('when email is sent a message is shown on screen', async () => {
        const { getByTestId, getByText, getByLabelText } = renderWithProviders(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        );

        // Wait for pageText to be populated
        await waitFor(() => {
            expect(getByTestId('contactTitle')).not.toBeEmptyDOMElement();
        });


        let elem = getByLabelText('Your name', { exact: false });
        fireEvent.change(elem, { target: { value: 'hello' } });
        elem = getByLabelText('Email', { exact: false });
        fireEvent.change(elem, { target: { value: 'hello@test.com' } });
        elem = getByLabelText('Message', { exact: false });
        fireEvent.change(elem, { target: { value: 'The message to send you' } });

        // Submit form
        await act(async () => {
            fireEvent.click(await getByText(/Send/));
        })

        // Wait for pageText to be populated
        await waitFor(async () => {

            expect(await getByText(/comments or questions/)).toBeInTheDocument();
        });

    });

    test('when error, error is displayed on scren', async () => {
        server.use(...errorHandlers)
        const { getByTestId, getByText, getByLabelText } = renderWithProviders(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        );

        // Wait for pageText to be populated
        await waitFor(() => {
            expect(getByTestId('contactTitle')).not.toBeEmptyDOMElement();
        });


        let elem = getByLabelText('Your name', { exact: false });
        fireEvent.change(elem, { target: { value: 'hello' } });
        elem = getByLabelText('Email', { exact: false });
        fireEvent.change(elem, { target: { value: 'hello@test.com' } });
        elem = getByLabelText('Message', { exact: false });
        fireEvent.change(elem, { target: { value: 'The message to send you' } });

        // Submit form
        await act(async () => {
            fireEvent.click(await getByText(/Send/));
        })

        // Wait for pageText to be populated
        await waitFor(async () => {

            expect(await getByText(/Error sending your message/)).toBeInTheDocument();
        });

    });
});