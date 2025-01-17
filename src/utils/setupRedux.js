import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "../reducers/rootReducer"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

export const persistConfig = {
    key: 'root', // Key prefix for the persisted state
    storage, // Storage mechanism (e.g., local storage)
    stateReconciler: autoMergeLevel2, // Specify which parts of the state to persist
    whitelist: ['profile', 'langFont']
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
let config = {
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
}
export const store = configureStore(config);
export const persistedStore = persistStore(store);


//
// Do everything that's done above, except do it in a function so it can be
// called before each test.
//

export function setupTestStore(preloadedState = null) {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let config = {
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                }
            })
    }
    if (preloadedState) {
        config.preloadedState = preloadedState;
    }

    const store = configureStore(config);
    const persistedStore = persistStore(store);

    return [store, persistedStore];
}
