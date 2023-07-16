import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../utils/testSetup';
import UnblockUser from './UnblockUser';
import { waitFor, act, screen } from '../utils/testSetup';


// Mock window.scrollTo()
window.scrollTo = jest.fn();
afterAll(() => {
    jest.clearAllMocks();
});


describe('UnblockUser', () => {
    // test('renders without crashing', () => {
    //     renderWithProviders(
    //         <MemoryRouter>
    //             <UnblockUser />
    //         </MemoryRouter>
    //     );
    // });

    // test('matches snapshot', async () => {
    //     const { asFragment } = renderWithProviders(
    //         <MemoryRouter>
    //             <UnblockUser />
    //         </MemoryRouter>
    //     );

    //     expect(asFragment()).toMatchSnapshot();
    // });


    test('able to UnblockUser a user', async () => {
        const { getByRole, getByText } =

            renderWithProviders(
                <MemoryRouter >
                    <UnblockUser />
                </MemoryRouter>
            );


        let myRadio = await getByRole('radio', { name: 'username' })
        fireEvent.click(myRadio)

        // Submit form
        await act(async () => {
            fireEvent.click(await getbyText(/Unblock/));
        })

        await waitFor(() => {
            // expect(getByTestId('blockUserData')).not.toBeEmptyDOMElement();
            expect(getByText(/blockMe/)).not.toBeInTheDocument();
        });
    })
})
