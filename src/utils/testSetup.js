import { persistedStore, store } from './setupRedux';
import { render } from '@testing-library/react'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'


const AllProviders = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistedStore}>
                {children}
            </PersistGate>
        </Provider>
    )
}

const renderWithProviders = (ui, options) =>
    render(ui, { wrapper: AllProviders, ...options })

// re-export everything
export * from '@testing-library/react';

export { renderWithProviders };