import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import HowToSite from './HowToSite';
import App from '../App';


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


describe('HowToSite', () => {
    test('renders without crashing', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/faq"]}>
                <App />
            </MemoryRouter>
        );
    });

    test('matches snapshot', async () => {
        const { asFragment } = renderWithProviders(
            <MemoryRouter initialEntries={["/faq"]}>
                <App />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});