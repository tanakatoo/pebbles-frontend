import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, renderWithProviders } from '../utils/testSetup';
import SetPassword from './SetPassword';
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


describe('SetPassword', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <SetPassword />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <SetPassword />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('valid reset password', async () => {
        const { getByTestId, getByLabelText, getByText } = await renderWithProviders(
            <MemoryRouter >
                <SetPassword />
            </MemoryRouter>
        );


        let elem = getByLabelText('Password', { exact: true });
        fireEvent.change(elem, { target: { value: 'newpassword' } });
        elem = getByLabelText('Re-enter password', { exact: false });
        fireEvent.change(elem, { target: { value: 'newpassword' } });

        // Submit form
        await act(async () => {
            fireEvent.click(await getByTestId(/resetPassword/));
        })

        // Wait for pageText to be populated
        await waitFor(() => {
            expect(getByTestId('wait-for-pagetext')).not.toBeEmptyDOMElement();
        });

        expect(getByText(/Password has been reset/)).toBeInTheDocument();

    });

});