import { configureStore } from '@reduxjs/toolkit';

import flightsReducer from './reducer';

export default configureStore({
  reducer: {
    flights: flightsReducer,
  },
});
