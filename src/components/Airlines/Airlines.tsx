import { useSelector } from 'react-redux';

import Airline from '../Airline/Airline';
import Button from '../Button';
import { TState, TTicket } from '../../types';

import classes from './Airlines.module.scss';

const FLIGHTS_PER_PAGE = 5;

export default function Airlines(): JSX.Element {
  const allTickets = useSelector<TState, TTicket[]>((state) => state.flights.tickets);
  const tickets = allTickets.slice(0, FLIGHTS_PER_PAGE);

  return (
    <section className={classes['airlines']}>
      <ul className={classes['airlines__list']}>
        {tickets.map((ticket) => (
          <Airline className={classes['airlines__item']} ticket={ticket} key={ticket.id} />
        ))}
      </ul>
      <Button />
    </section>
  );
}
