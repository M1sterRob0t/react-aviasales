import { createSlice } from '@reduxjs/toolkit';

import { SortType, FilterType } from '../constants';

const initialState = {
  filters: Object.values(FilterType),
  sortType: SortType.Cheapest,
};

export const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    changeFilterTypeAction: (state, action) => {
      state.filters = action.payload;
    },
    changeSortTypeAction: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const { changeFilterTypeAction, changeSortTypeAction } = flightsSlice.actions;

export default flightsSlice.reducer;
