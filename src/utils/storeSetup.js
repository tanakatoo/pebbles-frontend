import { combineReducers, configureStore } from '@reduxjs/toolkit'

import rootReducer from '../reducers/rootReducer'
// import userReducer from '../features/users/userSlice'

// Create the root reducer separately so we can extract the RootState type
// const rootReducer = combineReducers({
//     user: userReducer
// })

export const setupStore = preloadedState => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}