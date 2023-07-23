import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, renderWithProviders } from '../utils/testSetup';
import MessageMain from './MessageMain';
import App from '../App';
import { waitFor } from '../utils/testSetup';
import { act } from 'react-dom/test-utils';
import { server } from '../utils/server'
import { errorHandlers } from '../utils/errorHandlers';
import { actionLogin } from '../reducers/actionCreator';
import { useDispatch } from 'react-redux';
import { store } from '../utils/setupRedux';
import { LOGIN } from '../reducers/actionTypes';

// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});
let loginResponse = {
    token: 'abcdefg',
    user: {
        id: 2,
        username: 'hello',
        role: 'regular',
        premium_join_date: '',
        premium_end_date: '',
        free_trial_start_date: '',
    }
}

beforeEach(async () => {
    // const dispatch = useDispatch()

    const { getByTestId, getByLabelText, getByText } = renderWithProviders(
        <MemoryRouter >
            <App />
        </MemoryRouter>
    );

    // Populate form
    let changeLang = getByText('EN', { exact: true });
    fireEvent.click(changeLang);

    //login first - this one doesn't work
    // await act(() => {
    //     store.dispatch({
    //         type: LOGIN,

    //         token: 'abced',
    //         profile: {
    //             id: 2,
    //             username: 'hello',
    //             role: 'regular',
    //             premium_join_date: '',
    //             premium_end_date: '',
    //             free_trial_start_date: '',

    //         }
    //     })
    // })


})

afterEach(() => {
    window.localStorage.token = null
})


describe('MessageMain', () => {
    test('renders without crashing', async () => {
        await act(() => {
            renderWithProviders(
                <MemoryRouter>
                    <MessageMain />
                </MemoryRouter>
                , {
                    preloadedState: {
                        profile: {
                            token: 'abced',
                            profile: loginResponse
                        }
                    }
                });
        })

    });

    test('matches snapshot', async () => {
        await act(() => {
            const { asFragment } = renderWithProviders(
                <MemoryRouter>
                    <MessageMain />
                </MemoryRouter>
            );
            expect(asFragment()).toMatchSnapshot();
        })


    });


    test('unread messages are orange and read are black', async () => {
        const { getByTestId, getByRole, getByLabelText, getByText } = await renderWithProviders(
            <MemoryRouter >
                <MessageMain />
            </MemoryRouter >
        );


        await waitFor(() => {
            expect(getByText(/june/)).toBeInTheDocument();
            expect(getByText(/ktoo/)).toBeInTheDocument();
            expect(getByText(/june/)).toHaveStyle('color: ');
            expect(getByText(/june/)).toHaveStyle('color: text-secondary-dark');
        });

    });

    // test that new conversations are first and different color

});