import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginReducer from './slice/Auth/login-slice'
import signupReducer from './slice/Auth/signup-slice'
import projectsReducer from './slice/project/project-slice'
import projectAddReducer from './slice/project/project-add-slice'
import projectDetailReducer from './slice/project/project-details-slice'
import projectDeleteReducer from './slice/project/project-delete-slice'
import projectUpdateReducer from './slice/project/project-update-slice'

import estimationsReducer from './slice/estimation/estimation-slice'
import estimationAddReducer from './slice/estimation/estimation-add-slice'
import estimationDetailReducer from './slice/estimation/estimation-details-slice'
import estimationUpdateReducer from './slice/estimation/estimation-update-slice'
import estimationDeleteReducer from './slice/estimation/estimation-delete-slice'

import dashboardReducer from './slice/dashboard/dashboard-slice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  login: loginReducer,
  signup : signupReducer,
  projects: projectsReducer,
  projectGetById: projectDetailReducer,
  projectAdd: projectAddReducer,
  projectDelete: projectDeleteReducer,
  projectUpdate: projectUpdateReducer,
  dashboard : dashboardReducer,
  estimations: estimationsReducer,
  estimationAdd: estimationAddReducer,
  estimationGetById: estimationDetailReducer,
  estimationUpdate: estimationUpdateReducer,
  estimationDelete: estimationDeleteReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login'], // only persist the login slice
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action types for serializability middleware
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;