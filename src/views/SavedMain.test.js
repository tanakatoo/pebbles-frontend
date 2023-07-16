import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, renderWithProviders } from '../utils/testSetup';
import SavedMain from './SavedMain';
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

describe('SavedMain', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter>
                <SavedMain />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter>
                <SavedMain />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('Click on users and displays users that were saved', async () => {
        const { getByTestId, getByLabelText, getByText } = await renderWithProviders(
            <MemoryRouter >
                <SavedMain />
            </MemoryRouter>
        );


        // Submit form
        // await act(async () => {
        //     fireEvent.click(await getByText(/Users/));
        // })
        fireEvent.click(await getByText(/Users/));
        // fireEvent.click(getByTestId(/loginFormLogin/));

        // Wait for pageText to be populated
        await waitFor(() => {
            expect(getByTestId('pageTitle')).not.toBeEmptyDOMElement();
        });

    });

});