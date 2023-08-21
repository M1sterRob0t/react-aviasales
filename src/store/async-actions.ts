import type { TTicket, TServerTicket, TThunkActionResult } from '../types';

import { setTicketsAction } from './reducer';

type TServerGetTicketsResponse = {
  stop: boolean;
  tickets: TServerTicket[];
};

type TServerGetSearchIdResponse = {
  searchId: string;
};

export function fetchTickets(): TThunkActionResult {
  return async function (dispatch, _getState, api): Promise<void> {
    const searhResponse = await api.get<TServerGetSearchIdResponse>('/search');
    const searchId = searhResponse.data.searchId;

    const { data } = await api.get<TServerGetTicketsResponse>(`/tickets?searchId=${searchId}`);
    const tickets: TTicket[] = data.tickets.map((ticket, i) => Object.assign(ticket, { id: i }));
    dispatch(setTicketsAction(tickets));
  };
}
