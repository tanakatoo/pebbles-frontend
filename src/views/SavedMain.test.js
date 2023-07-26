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
    window.localStorage.clear()

})

afterEach(() => {
    window.localStorage.clear()
})

let loginResponse = {
    token: 'abcdefg',
    profile: {
        id: 2,
        username: 'hello',
        name: 'Hello World',
        email: "karmen.tanakaa@gmail.com",
        role: 'regular',
        premium_join_date: '',
        premium_end_date: '',
        free_trial_start_date: '',
        study_buddy_types: [],
        study_buddy_active: false
    }
};

describe('SavedMain', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/users/saved"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/saved"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('Click on users and displays users that were saved', async () => {
        const { findByTestId, findByLabelText, findByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/saved"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );


        let elem = await findByText(/Users/)
        fireEvent.click(elem);
        // fireEvent.click(getByTestId(/loginFormLogin/));

        // Wait for pageText to be populated
        elem = await findByText(/Saved users/)
        expect(elem).toBeInTheDocument();


    });

});