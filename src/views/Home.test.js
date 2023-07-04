import { render, screen } from '@testing-library/react';
import Home from './Home';
import { renderWithProviders } from '../utils/setupRedux'
import { store } from "../index"

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
    rest.get('/api/user', (req, res, ctx) => {
        return res(ctx.json('John Smith'), ctx.delay(150))
    })
]
const root = document.createElement('div');
const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

beforeEach(() => {
    document.body.appendChild(root);

    const content = (
        <Provider store={store}>
            <App />
        </Provider>
    );

    render(
        content,
        root
    );
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('renders the landing page', () => {
    renderWithProviders(<Home />);

    // expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    // expect(screen.getByRole("textbox")).toHaveDisplayValue("Select a breed");
    // expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
    // expect(screen.getByRole("img")).toBeInTheDocument();
});