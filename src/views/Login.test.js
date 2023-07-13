import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, renderWithProviders } from '../utils/testSetup';
import Login from './Login';
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

describe('Login', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('valid user login', async () => {
        const { getByTestId, getByLabelText, getByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/login"]}>
                <App />
            </MemoryRouter>
        );


        let elem = getByLabelText('Username or email', { exact: false });
        fireEvent.change(elem, { target: { value: 'hello' } });
        elem = getByLabelText('Password', { exact: false });
        fireEvent.change(elem, { target: { value: 'asdfasdf' } });

        // Submit form
        // act(() => {
        //     fireEvent.click(getByTestId(/loginFormLogin/));
        // })
        fireEvent.click(getByTestId(/loginFormLogin/));

        // Wait for pageText to be populated
        await waitFor(() => {
            expect(getByTestId('wait-for-pagetext')).not.toBeEmptyDOMElement();
        });

        // Are we on the Dashboard page?
        expect(getByText(/Learn how to use Pebbles/)).toBeInTheDocument();
    });
});