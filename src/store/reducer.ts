import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { SortType, FilterType } from '../constants';
import { TFlightsState, TFilter, TSort, TTicket } from '../types';

const initialState: TFlightsState = {
  filters: Object.values(FilterType),
  sortType: SortType.Cheapest,
  tickets: [],
};

export const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    changeFilterTypeAction: (state: TFlightsState, action: PayloadAction<TFilter[]>) => {
      state.filters = action.payload;
    },
    changeSortTypeAction: (state: TFlightsState, action: PayloadAction<TSort>) => {
      state.sortType = action.payload;
    },
    setTicketsAction: (state: TFlightsState, action: PayloadAction<TTicket[]>) => {
      state.tickets = action.payload;
    },
  },
});

export const { changeFilterTypeAction, changeSortTypeAction, setTicketsAction } = flightsSlice.actions;

export default flightsSlice.reducer;
