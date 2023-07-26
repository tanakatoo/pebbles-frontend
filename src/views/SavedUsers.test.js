import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, renderWithProviders } from '../utils/testSetup';
import SavedUsers from './SavedUsers';
import App from '../App';
import { waitFor } from '../utils/testSetup';
import { act } from 'react-dom/test-utils';
import { rest } from 'msw';
import { server } from '../utils/server';


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

describe('SavedUsers', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/users/saved/users"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/saved/users"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('Click on username and go to profile', async () => {
        const { findByTestId, findByLabelText, findByText } = await renderWithProviders(
            <MemoryRouter initialEntries={["/users/saved/users"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );


        let elem = await findByText(/hello/)
        expect(elem).toBeInTheDocument()
        elem = await findByText(/hello/)
        fireEvent.click(elem);

        server.use(
            rest.get('http://localhost:3001/users/:username', (req, res, ctx) => {
                console.log('MOCK different user /users/:username');

                return res.once(ctx.json({
                    "id": 5,
                    "username": "anotheruser",
                    "name": "",
                    "email": "karmen.tanakaa@gmail.com",
                    "role": "regular",
                    "avatar": "9.jpg",
                    "sign_up_date": "2023-05-01T00:00:00.000Z",
                    "last_login_date": "2023-05-01T00:00:00.000Z",
                    "language_preference": "English",
                    "country_en": "",
                    "country_ja": "",
                    "city_en": "",
                    "city_ja": "",
                    "state_en": "",
                    "state_ja": "",
                    "gender": "male",
                    "about": "",
                    "study_buddy_bio": "",
                    "native_language": "",
                    "learning_language": "",
                    "language_level": "",
                    "myway_language_level": "",
                    "time_zone": "",
                    "age_range": "",
                    "study_buddy_active": false,
                    "study_buddy_purpose": "",
                    "free_trial_start_date": null,
                    "study_buddy_activate_date": null,
                    "study_buddy_types": [],
                    "goals": []
                }));
            }),
        )
        // Wait for pageText to be populated
        elem = await findByText('Save')
        expect(elem).toBeInTheDocument();


    });

});