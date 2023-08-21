import { Flight } from '../Flight/Flight';
import { TTicket } from '../../types';

import classes from './Airline.module.scss';
import companyLogo from './images/company-logo.png';

interface IAirlineProps {
  className: string;
  ticket: TTicket;
}

export default function Airline({ className, ticket }: IAirlineProps): JSX.Element {
  const formattedPrice =
    ticket.price / 1000 >= 1 ? `${Math.floor(ticket.price / 1000)} ${ticket.price % 1000}` : ticket.price;

  return (
    <li className={`${className} ${classes['airline']}`}>
      <div className={classes['airline__header']}>
        <div className={classes['airline__price']}>{formattedPrice} &#8381;</div>
        <div className={classes['airline__company-logo']}>
          <img
            className={classes['airline__logo-image']}
            src={companyLogo}
            width="110"
            height="36"
            alt="company logo"
          />
        </div>
      </div>
      <div className={classes['airline__body']}>
        <ul className={classes['airline__flights-list']}>
          {ticket.segments.map((segment) => (
            <Flight className={classes['airline__flights-item']} segment={segment} key={segment.date} />
          ))}
        </ul>
      </div>
    </li>
  );
}
