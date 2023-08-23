import { nanoid } from 'nanoid';
import { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';

import type { TTicket, TServerTicket, TThunkActionResult, TThunkAppDispatch } from '../types';

import { setTicketsAction, toggLoadingAction, changeLoadingProgressAction, setErrorAction } from './reducer';

type TServerGetTicketsResponse = {
  stop: boolean;
  tickets: TServerTicket[];
};

type TServerGetSearchIdResponse = {
  searchId: string;
};

async function fetchTickets(
  searchId: string,
  api: AxiosInstance,
  prevTickets: TTicket[],
  dispatch: TThunkAppDispatch
): Promise<TTicket[]> {
  try {
    const { data } = await api.get<TServerGetTicketsResponse>(`/tickets?searchId=${searchId}`);
    const newTickets = data.tickets.map((ticket) => ({ ...ticket, id: nanoid() }));
    const tickets: TTicket[] = [...prevTickets, ...newTickets];

    if (!prevTickets.length) dispatch(toggLoadingAction());

    dispatch(setTicketsAction(tickets));
    dispatch(changeLoadingProgressAction(tickets.length));

    if (!data.stop) {
      return await fetchTickets(searchId, api, tickets, dispatch);
    } else {
      return tickets;
    }
  } catch (err) {
    const error = err as AxiosError;
    const { response } = error;

    if (response && response.status === 500) {
      return await fetchTickets(searchId, api, prevTickets, dispatch);
    } else {
      dispatch(toggLoadingAction());
      dispatch(setErrorAction(error));
      return Promise.resolve(prevTickets);
    }
  }
}

export function fetchAllTickets(): TThunkActionResult {
  return async function (dispatch, _getState, api): Promise<void> {
    try {
      const searhResponse = await api.get<TServerGetSearchIdResponse>('/search');
      const searchId = searhResponse.data.searchId;
      fetchTickets(searchId + 'sad', api, [], dispatch);
    } catch (err) {
      const error = err as AxiosError;
      dispatch(toggLoadingAction());
      dispatch(setErrorAction(error));
    }
  };
}
