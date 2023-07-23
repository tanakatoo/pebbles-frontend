import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, renderWithProviders } from '../utils/testSetup';
import Message from './Message';
import App from '../App';
import { waitFor } from '../utils/testSetup';
import { act } from 'react-dom/test-utils';
import { server } from '../utils/server'
import { errorHandlers } from '../utils/errorHandlers';
import { actionLogin } from '../reducers/actionCreator';
import { useDispatch } from 'react-redux';
import { store } from '../utils/setupRedux';
import { LOGIN } from '../reducers/actionTypes';
import Router from "react-router-dom";
import rootReducer from '../reducers/rootReducer';

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

})


afterEach(() => {
    window.localStorage.token = null
})

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

describe('Message', () => {
    // test('renders without crashing', async () => {
    //     jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
    //     await act(() => {
    //         renderWithProvidersLoggedIn(
    //             <MemoryRouter>
    //                 <Message />
    //             </MemoryRouter>);
    //     })

    // });

    // test('matches snapshot', async () => {
    //     jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
    //     await act(() => {
    //         const { asFragment } = renderWithProvidersLoggedIn(
    //             <MemoryRouter>
    //                 <Message />
    //             </MemoryRouter>);
    //         expect(asFragment()).toMatchSnapshot();
    //     })


    // });


    test('add to conversation', async () => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ username: 'hello' })
        const { getByTestId, getByRole, getByLabelText, getByText } = await renderWithProviders(
            <MemoryRouter >
                <Message />
            </MemoryRouter >,
            {
                preloadedState: { profile: loginResponse }
            }
        );

        await act(async () => {
            let elem = getByRole('textbox');
            fireEvent.change(elem, { target: { value: 'hi' } });
            fireEvent.keyDown(elem, { key: 'Enter', code: 'Enter', charCode: 13 })
            await waitFor(() => {
                expect(getByText(/Last sent/)).toBeInTheDocument();
                expect(getByText(/hi/)).toBeInTheDocument();
            });
        })
    });
});