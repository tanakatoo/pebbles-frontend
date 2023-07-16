import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, renderWithProviders } from '../utils/testSetup';
import ChangePassword from './ChangePassword';
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


describe('ChangePassword', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <ChangePassword />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <ChangePassword />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });


    test('valid email', async () => {
        const { getByTestId, getByLabelText, getByText } = await renderWithProviders(
            <MemoryRouter >
                <ChangePassword />
            </MemoryRouter >
        );


        let elem = getByLabelText('Email or username', { exact: false });
        fireEvent.change(elem, { target: { value: 'hello' } });

        // Submit form
        await act(async () => {
            fireEvent.click(await getByText(/Submit/));
        })

        await waitFor(() => {
            expect(getByText(/has been sent/)).toBeInTheDocument();
        });

    });


});