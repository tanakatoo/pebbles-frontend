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
    window.localStorage.clear()

})

afterEach(() => {
    window.localStorage.clear()
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
        const { findByTestId, findByLabelText, findByText } = renderWithProviders(
            <MemoryRouter >
                <SetPassword />
            </MemoryRouter>
        );


        let elem = await findByLabelText('Password', { exact: true });
        fireEvent.change(elem, { target: { value: 'newpassword' } });
        elem = await findByLabelText('Re-enter password', { exact: false });
        fireEvent.change(elem, { target: { value: 'newpassword' } });

        // Submit form
        elem = await findByTestId(/resetPassword/)
        fireEvent.click(elem);


        // Wait for pageText to be populated
        elem = await findByTestId('wait-for-pagetext')
        expect(elem).not.toBeEmptyDOMElement();

        elem = await findByText(/Password has been reset/)
        expect(elem).toBeInTheDocument();

    });

});