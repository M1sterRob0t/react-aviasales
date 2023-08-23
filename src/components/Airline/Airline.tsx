import { Flight } from '../Flight/Flight';
import { TTicket } from '../../types';

import classes from './Airline.module.scss';
import companyLogo from './images/company-logo.png';

interface IAirlineProps {
  className: string;
  ticket: TTicket;
}

function getFormattedPrice(price: number): string {
  const thousands = Math.floor(price / 1000);
  const rest = price % 1000;
  let formattedPrice = '';

  if (thousands) formattedPrice += thousands;

  if (rest === 0) formattedPrice += ' 000';
  else if (rest < 10) formattedPrice += ` 00${rest}`;
  else if (rest < 100) formattedPrice += ` 0${rest}`;
  else formattedPrice += ` ${rest}`;

  return formattedPrice;
}

export default function Airline({ className, ticket }: IAirlineProps): JSX.Element {
  const formattedPrice = getFormattedPrice(ticket.price);

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
