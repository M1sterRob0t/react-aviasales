import { nanoid } from 'nanoid';
import type { AxiosInstance, AxiosError } from 'axios';

import type { TTicket, TServerTicket, TThunkActionResult, TThunkAppDispatch } from '../types';

import { setTicketsAction } from './reducer';

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
    dispatch(setTicketsAction(tickets));

    if (!data.stop) {
      return await fetchTickets(searchId, api, tickets, dispatch);
    } else {
      console.log(tickets);
      console.log('stop');
      return tickets;
    }
  } catch (error) {
    const { response } = error as AxiosError;

    if (response && response.status === 500) {
      return await fetchTickets(searchId, api, prevTickets, dispatch);
    }
    console.log('return prevTickets');
    return prevTickets;
  }
}

export function fetchAllTickets(): TThunkActionResult {
  return async function (dispatch, _getState, api): Promise<void> {
    const searhResponse = await api.get<TServerGetSearchIdResponse>('/search');
    const searchId = searhResponse.data.searchId;

    /* const allTickets = await fetchTickets(searchId, api, [], dispatch);
    dispatch(setTicketsAction(allTickets)); */

    fetchTickets(searchId, api, [], dispatch);
  };
}
