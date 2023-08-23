import { useState } from 'react';
import { useSelector } from 'react-redux';

import Airline from '../Airline/Airline';
import Button from '../Button';
import { TState, TTicket } from '../../types';

import classes from './Airlines.module.scss';

const TICKETS_PER_PAGE = 5;
const SHOW_TICKETS_PER_CLICK = 5;

export default function Airlines(): JSX.Element {
  const [showedTicketsAmount, setShowedTicketsAmount] = useState(TICKETS_PER_PAGE);
  const allTickets = useSelector<TState, TTicket[]>((state) => state.flights.currentTickets);
  const tickets = allTickets.slice(0, showedTicketsAmount);
  return (
    <section className={classes['airlines']}>
      {tickets.length === 0 ? (
        <p className={classes['airlines__no-flights']}>Рейсов, подходящих под заданные фильтры, не найдено.</p>
      ) : (
        <ul className={classes['airlines__list']}>
          {tickets.map((ticket) => (
            <Airline className={classes['airlines__item']} ticket={ticket} key={ticket.id} />
          ))}
        </ul>
      )}
      <Button
        onClick={() => setShowedTicketsAmount((prev) => prev + SHOW_TICKETS_PER_CLICK)}
        isShown={tickets.length ? true : false}
      />
    </section>
  );
}
