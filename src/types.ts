import type { AxiosInstance } from 'axios';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { flightsSlice } from './store/reducer';

export type TSortType = {
  [propertyName: string]: {
    text: string;
    id: string;
    name: string;
    value: string;
  };
};

export type TSort = {
  text: string;
  id: string;
  name: string;
  value: string;
};

export type TFilterType = {
  [propertyName: string]: {
    text: string;
    name: string;
    value: string;
  };
};

export type TFilter = {
  text: string;
  name: string;
  value: string;
};

export type TSegment = {
  origin: string;
  destination: string;
  date: string;
  duration: number;
  stops: string[];
};

export type TServerTicket = {
  price: number;
  carrier: string;
  segments: TSegment[];
};

export type TTicket = {
  id: string;
  price: number;
  carrier: string;
  segments: TSegment[];
};

export type TFlightsState = {
  sortType: TSort;
  filters: TFilter[];
  tickets: TTicket[];
};

export type TState = {
  flights: TFlightsState;
};

export type TChangeFilterTypeAction = ReturnType<typeof flightsSlice.actions.changeFilterTypeAction>;
export type TChangeSortTypeAction = ReturnType<typeof flightsSlice.actions.changeSortTypeAction>;
export type TSetTicketsAction = ReturnType<typeof flightsSlice.actions.setTicketsAction>;

export type TThunkActionResult<R = Promise<void>> = ThunkAction<R, TState, AxiosInstance, TSetTicketsAction>;
export type TThunkAppDispatch = ThunkDispatch<TState, AxiosInstance, TSetTicketsAction>;
