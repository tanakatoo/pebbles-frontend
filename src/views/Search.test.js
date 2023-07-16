import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import Search from './Search';
import { fireEvent, waitFor } from '../utils/testSetup';
import { act } from 'react-dom/test-utils';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});


describe('Search', () => {
    // test('renders without crashing', () => {
    //     renderWithProviders(
    //         <MemoryRouter>
    //             <Search />
    //         </MemoryRouter>
    //     );
    // });

    // test('matches snapshot', async () => {
    //     const { asFragment } = renderWithProviders(
    //         <MemoryRouter>
    //             <Search />
    //         </MemoryRouter>
    //     );

    //     expect(asFragment()).toMatchSnapshot();
    // });
    test('search results display', async () => {
        const { findByText, getByTestId, getByRole, getByText } = await renderWithProviders(
            <MemoryRouter>
                <Search />
            </MemoryRouter>
        );

        act(async () => {
            let elem = getByRole('textbox');
            fireEvent.change(elem, { target: { value: 'hello' } });
            fireEvent.keyDown(elem, { key: 'Enter', code: 'Enter', charCode: 13 })

            // Wait for pageText to be populated
            await waitFor(async () => {
                expect(getByTestId('results')).not.toBeEmptyDOMElement();

                await findByText('helloo')

            })
        })
    })

    // fireEvent.click(button)
    // await screen.findByText('Clicked twice')
    // // Submit form
    // await act(async () => {
    //     await fireEvent.keyDown(elem, { key: 'Enter', code: 'Enter', charCode: 13 })
    // })
    // // fireEvent.click(getByTestId(/loginFormLogin/));


    // });

    // expect(getByText(/helloo/)).toBeInTheDocument();

});


