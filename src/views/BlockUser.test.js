import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import BlockUser from './BlockUser';
import { waitFor, act } from '../utils/testSetup';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});


describe('BlockUser', () => {
    // test('renders without crashing', () => {
    //     renderWithProviders(
    //         <MemoryRouter>
    //             <BlockUser />
    //         </MemoryRouter>
    //     );
    // });

    // test('matches snapshot', async () => {
    //     const { asFragment } = renderWithProviders(
    //         <MemoryRouter>
    //             <BlockUser />
    //         </MemoryRouter>
    //     );

    //     expect(asFragment()).toMatchSnapshot();
    // });

    // test('see contacts on the screen', async () => {
    //     const { getByTestId, getByLabelText, getByText } = await act(async () => {
    //         renderWithProviders(
    //             <MemoryRouter >
    //                 <BlockUser />
    //             </MemoryRouter>
    //         );
    //         await waitFor(() => {
    //             // expect(getByTestId('blockUserData')).not.toBeEmptyDOMElement();
    //             expect(getByText(/june/)).toBeInTheDocument();
    //         });
    //     })

    // });

    test('able to block a user', async () => {
        const { getByRole, getByText } = await act(async () => {

            renderWithProviders(
                <MemoryRouter >
                    <BlockUser />
                </MemoryRouter>
            );

            let myRadio = await getByRole('radio', { name: 'username' })
            fireEvent.click(myRadio)

            // Submit form
            await act(async () => {
                fireEvent.click(await getbyText(/Block/));
            })
            await waitFor(() => {
                // expect(getByTestId('blockUserData')).not.toBeEmptyDOMElement();
                expect(getByText(/june/)).not.toBeInTheDocument();
            });
        })
    })

});