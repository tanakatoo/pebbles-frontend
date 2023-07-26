import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { findByRole, findByTestId, findByText, renderWithProviders } from '../utils/testSetup';
import Dashboard from './Dashboard';
import { waitFor } from '../utils/testSetup';
import { withDataHandlers } from '../utils/withDataHandlers';
import { server } from '../utils/server'
import { act } from 'react-dom/test-utils';
import { fireEvent } from '../utils/testSetup';
import { screen } from '../utils/testSetup';
import App from '../App';
import { rest } from 'msw';


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
        id: 5,
        username: 'loginUser',
        name: 'World',
        email: "karmen.tanakaa@gmail.com",
        role: 'regular',
        premium_join_date: '',
        premium_end_date: '',
        free_trial_start_date: '',
        study_buddy_types: [],
        study_buddy_active: false
    }
};


describe('Dashboard', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/users/dashboard"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/dashboard"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('displays no study buddies', async () => {
        const { getByTestId, getByLabelText, findByText } = renderWithProviders(
            <MemoryRouter initialEntries={["/users/dashboard"]}>
                <App />
            </MemoryRouter>,
            {
                preloadedState: { profile: loginResponse }
            }
        );

        // Wait for pageText to be populated
        let elem = await findByText(/No study buddies yet!/)
        expect(elem).toBeInTheDocument();

    });

    test('displays 1 study buddy when click see all goes to study buddy page', async () => {
        server.use(...withDataHandlers)

        const { findByRole, findByTestId, findByText } =
            renderWithProviders(
                <MemoryRouter initialEntries={["/users/dashboard"]}>
                    <App />
                </MemoryRouter>,
                {
                    preloadedState: { profile: loginResponse }
                }
            );

        let elem = await findByText(/Volunteer/);
        expect(elem).toBeInTheDocument();
        //There should not be any study buddies
        elem = await findByText(/hello/);
        console.log(elem)
        expect(elem).toBeInTheDocument();

        //try clicking on see All
        elem = await findByText(/See all/)
        fireEvent.click(elem);

        elem = await findByTestId('studyBuddyPage');
        expect(elem).toBeInTheDocument();
    });


    test('click on username goes to profile study buddy tab', async () => {
        server.use(...withDataHandlers)

        const { findByRole, findByText } =
            renderWithProviders(
                <MemoryRouter initialEntries={["/users/dashboard"]}>
                    <App />
                </MemoryRouter>,
                {
                    preloadedState: { profile: loginResponse }
                }
            );

        let elem = await findByText(/Volunteer/);
        expect(elem).toBeInTheDocument();
        //There should not be any study buddies
        elem = await findByText(/hello/);
        expect(elem).toBeInTheDocument();

        //try clicking on hello
        fireEvent.click(elem);

        //mock return data 
        const returnUser = {
            id: 2,
            username: 'hello',
            name: '',
            email: 'karmen.tanakaa@gmail.com',
            role: 'regular',
            avatar: '9.jpg',
            sign_up_date: '2023-05-01T00:00:00.000Z',
            last_login_date: '2023-05-01T00:00:00.000Z',
            language_preference: 'English',
            country_en: '',
            country_ja: '',
            city_en: '',
            city_ja: '',
            state_en: '',
            state_ja: '',
            gender: 'male',
            about: '',
            myway_advice: '',
            myway_habits: '',
            motivational_level: '',
            study_time: '',
            premium_join_date: null,
            premium_end_date: null,
            raz_reading_level: '',
            study_buddy_bio: '',
            native_language: '',
            learning_language: '',
            language_level: '',
            myway_language_level: '',
            time_zone: '',
            age_range: '',
            study_buddy_active: false,
            study_buddy_purpose: '',
            free_trial_start_date: null,
            study_buddy_activate_date: null,
            study_buddy_types: [],
            goals: []
        }

        server.use(
            rest.get('http://localhost:3001/users/:username', (req, res, ctx) => {
                console.log('MOCK not own profile /users/:username');

                return res.once(ctx.json(returnUser));
            }),
        )


        elem = await findByText('Save');
        expect(elem).toBeInTheDocument();
    });

});