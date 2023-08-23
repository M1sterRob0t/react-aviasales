import { AxiosError } from 'axios';
import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { SortType, FilterType, TOTAL_TICKET_AMOUNT } from '../constants';
import { TFlightsState, TFilter, TSort, TTicket } from '../types';

const initialState: TFlightsState = {
  filters: Object.values(FilterType),
  sortType: SortType.Cheapest,
  tickets: [],
  isDataLoadig: true,
  loadingProgress: 0,
  currentTickets: [],
  error: null,
};

function getSortedTickets(tickets: TTicket[], sortType: TSort): TTicket[] {
  const sortedTickets = tickets.slice();

  switch (sortType.value) {
    case SortType.Cheapest.value:
      sortedTickets.sort((a, b) => a.price - b.price);
      break;
    case SortType.Fastest.value:
      sortedTickets.sort(
        (a, b) =>
          a.segments.reduce((prev, cur) => prev + cur.duration, 0) -
          b.segments.reduce((prev, cur) => prev + cur.duration, 0)
      );
      break;
    case SortType.Optimal.value:
      sortedTickets.sort((a, b) => {
        const points = {
          a: 0,
          b: 0,
        };

        const durationA = a.segments.reduce((prev, cur) => prev + cur.duration, 0);
        const durationB = b.segments.reduce((prev, cur) => prev + cur.duration, 0);

        const stopsA = a.segments.reduce((prev, cur) => prev + cur.stops.length, 0);
        const stopsB = b.segments.reduce((prev, cur) => prev + cur.stops.length, 0);

        a.price < b.price ? points.a++ : a.price === b.price ? null : points.b++;
        durationA < durationB ? (points.a += 1) : durationA === durationB ? null : (points.b += 1);
        stopsA < stopsB ? (points.a += 0.5) : stopsA === stopsB ? null : (points.b += 0.5);

        return points.b - points.a;
      });
      break;
  }

  return sortedTickets;
}

function getFilteredTickets(tickets: TTicket[], filters: TFilter[]): TTicket[] {
  const currentFilters = Object.values(FilterType).filter((el) => filters.find((filter) => filter.value === el.value));
  let filteredTickets: TTicket[] = [];

  if (currentFilters.includes(FilterType.All)) {
    filteredTickets = tickets.slice();
  } else {
    if (currentFilters.includes(FilterType.Zero)) {
      filteredTickets = [
        ...filteredTickets,
        ...tickets.filter((ticket) => ticket.segments.every((item) => item.stops.length === 0)),
      ];
    }
    if (currentFilters.includes(FilterType.One)) {
      filteredTickets = [
        ...filteredTickets,
        ...tickets.filter((ticket) => ticket.segments.every((item) => item.stops.length === 1)),
      ];
    }
    if (currentFilters.includes(FilterType.Two)) {
      filteredTickets = [
        ...filteredTickets,
        ...tickets.filter((ticket) => ticket.segments.every((item) => item.stops.length === 2)),
      ];
    }
    if (currentFilters.includes(FilterType.Three)) {
      filteredTickets = [
        ...filteredTickets,
        ...tickets.filter((ticket) => ticket.segments.every((item) => item.stops.length === 3)),
      ];
    }
  }

  return filteredTickets;
}

function getCurrentTickets(tickets: TTicket[], sortType: TSort, filters: TFilter[]): TTicket[] {
  const filteredTickets = getFilteredTickets(tickets, filters);
  const sortedAndFilteredTickets = getSortedTickets(filteredTickets, sortType);

  return sortedAndFilteredTickets;
}

export const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    changeFilterTypeAction: (state, action: PayloadAction<TFilter[]>) => {
      state.filters = action.payload;
      const currentState = current(state);
      state.currentTickets = getCurrentTickets(currentState.tickets, currentState.sortType, currentState.filters);
    },
    changeSortTypeAction: (state, action: PayloadAction<TSort>) => {
      state.sortType = action.payload;
      const currentState = current(state);
      state.currentTickets = getCurrentTickets(currentState.tickets, currentState.sortType, currentState.filters);
    },
    setTicketsAction: (state, action: PayloadAction<TTicket[]>) => {
      state.tickets = action.payload;
      const currentState = current(state);
      state.currentTickets = getCurrentTickets(currentState.tickets, currentState.sortType, currentState.filters);
    },
    toggLoadingAction: (state) => {
      state.isDataLoadig = !state.isDataLoadig;
    },
    changeLoadingProgressAction: (state, action: PayloadAction<number>) => {
      state.loadingProgress = Math.round((action.payload / TOTAL_TICKET_AMOUNT) * 100);
    },
    setErrorAction: (state, action: PayloadAction<AxiosError>) => {
      state.error = action.payload;
    },
  },
});

export const {
  changeFilterTypeAction,
  changeSortTypeAction,
  setTicketsAction,
  toggLoadingAction,
  changeLoadingProgressAction,
  setErrorAction,
} = flightsSlice.actions;

export default flightsSlice.reducer;
