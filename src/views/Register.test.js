import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, renderWithProviders } from '../utils/testSetup';
import Register from './Register';
import App from '../App';
import { waitFor } from '../utils/testSetup';
import { act } from 'react-dom/test-utils';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});

beforeEach(async () => {
    const { getByTestId, getByLabelText, getByText } = renderWithProviders(
        <MemoryRouter >
            <App />
        </MemoryRouter>
    );

    // Populate form
    let changeLang = getByText('EN', { exact: true });
    fireEvent.click(changeLang);
})

afterEach(() => {
    window.localStorage.token = null
})

describe('Register', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('valid user registration', async () => {
        const { getByTestId, getByLabelText, getByText } = await renderWithProviders(
            <MemoryRouter initialEntries={["/register"]}>
                <App />
            </MemoryRouter>
        );


        let elem = getByLabelText('Username', { exact: false });
        fireEvent.change(elem, { target: { value: 'testUser' } });
        elem = getByLabelText('Email', { exact: false });
        fireEvent.change(elem, { target: { value: 'testUser@test.com' } });
        elem = getByLabelText('Password', { exact: true });
        fireEvent.change(elem, { target: { value: 'asdfasdf' } });
        elem = getByLabelText('Re-enter password', { exact: false });
        fireEvent.change(elem, { target: { value: 'asdfasdf' } });

        // Submit form
        await act(async () => {
            fireEvent.click(await getByTestId(/registerBtn/));
        })
        // fireEvent.click(getByTestId(/loginFormLogin/));

        // Wait for pageText to be populated
        await waitFor(() => {
            expect(getByTestId('wait-for-pagetext')).not.toBeEmptyDOMElement();
        });

        // Are we on the Dashboard page?
        expect(getByText(/Learn how to use Pebbles/)).toBeInTheDocument();
        //There should not be any study buddies
        expect(getByText(/No study buddies yet! /)).toBeInTheDocument();
    });

    // test('valid user registration', async () => {
    //     const { getByTestId, getByLabelText, getByText } = await renderWithProviders(
    //         <MemoryRouter initialEntries={["/register"]}>
    //             <App />
    //         </MemoryRouter>
    //     );

    //     let elem = getByLabelText('Username', { exact: false });
    //     fireEvent.change(elem, { target: { value: 'testUser' } });
    //     elem = getByLabelText('Email', { exact: false });
    //     fireEvent.change(elem, { target: { value: 'testUser@test.com' } });
    //     elem = getByLabelText('Password', { exact: true });
    //     fireEvent.change(elem, { target: { value: 'asdfasdf' } });
    //     elem = getByLabelText('Re-enter password', { exact: false });
    //     fireEvent.change(elem, { target: { value: 'asdfasdf' } });

    //     // Submit form
    //     await act(async () => {
    //         fireEvent.click(await getByTestId(/registerBtn/));
    //     })
    //     // fireEvent.click(getByTestId(/loginFormLogin/));

    //     // Wait for pageText to be populated
    //     await waitFor(() => {
    //         expect(getByTestId('wait-for-pagetext')).not.toBeEmptyDOMElement();
    //     });

    //     // Are we on the Dashboard page?
    //     expect(getByText(/Learn how to use Pebbles/)).toBeInTheDocument();
    //     //There should not be any study buddies
    //     expect(getByText(/No study buddies yet! /)).toBeInTheDocument();
    // });
});