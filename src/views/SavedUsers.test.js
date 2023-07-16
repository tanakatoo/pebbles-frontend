import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, renderWithProviders } from '../utils/testSetup';
import SavedUsers from './SavedUsers';
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

describe('SavedUsers', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <SavedUsers />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <SavedUsers />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('Click on username and go to profile', async () => {
        const { getByTestId, getByLabelText, getByText } = await renderWithProviders(
            <MemoryRouter >
                <SavedUsers />
            </MemoryRouter>
        );


        await waitFor(() => {
            expect(getByText(/hello/)).toBeInTheDocument()
        })
        // Submit form
        await act(async () => {

            fireEvent.click(await getByText(/hello/));
        })

        // fireEvent.click(getByTestId(/loginFormLogin/));

        // Wait for pageText to be populated
        await waitFor(() => {
            expect(getByTestId('profileUsername')).not.toBeEmptyDOMElement();
        });

    });

});