import { configureStore } from '@reduxjs/toolkit';

import { createApi } from '../api';

import flightsReducer from './reducer';

export default configureStore({
  reducer: {
    flights: flightsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createApi(),
      },
      serializableCheck: false,
    }),
});
