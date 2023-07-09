import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// As a basic setup, import your same slice reducers
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import { ListSlice } from "../reducers/rootReducer";
import rootReducer from "../reducers/rootReducer"
import storage from 'redux-persist/lib/storage'
import storeSetup from "./storeSetup"
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

// const persistConfig = {
//     key: 'root', // Key prefix for the persisted state
//     storage, // Storage mechanism (e.g., local storage)
//     stateReconciler: autoMergeLevel2, // Specify which parts of the state to persist
//     whitelist: ['profile', 'langFont']
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const persistedStore = persistStore(store)
// const root = ReactDOM.createRoot(document.getElementById('root'));


export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = storeSetup(preloadedState),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {

        return <Provider store={store}>{children}</Provider>;
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}