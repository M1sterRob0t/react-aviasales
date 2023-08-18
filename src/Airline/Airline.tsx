import companyLogo from './images/company-logo.png';
import classes from './Airline.module.scss';

interface IAirlineProps {
  className: string;
}

export default function Airline({ className }: IAirlineProps): JSX.Element {
  return (
    <li className={`${className} ${classes['airline']}`}>
      <div className={classes['airline__header']}>
        <div className={classes['airline__price']}>13 400 &#8381;</div>
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
          <li className={`${classes['airline__flights-item']} ${classes['flight']}']`}>
            <div className={classes['flight__schedule']}>
              <table className={classes['flight__schedule-table']}>
                <tr className={classes['flight__schedule-table-row']}>
                  <th className={classes['flight__schedule-table-header']}>MOW – HKT</th>
                  <th className={classes['flight__schedule-table-header']}>В пути</th>
                  <th className={classes['flight__schedule-table-header']}>2 пересадки</th>
                </tr>
                <tr className={classes['flight__schedule-table-row']}>
                  <td className={classes['flight__schedule-table-cell']}>10:45 – 08:00</td>
                  <td className={classes['flight__schedule-table-cell']}>21ч 15м</td>
                  <td className={classes['flight__schedule-table-cell']}>HKG, JNB</td>
                </tr>
              </table>
            </div>
          </li>
          <li className={`${classes['airline__flights-item']} ${classes['flight']}']`}>
            <div className={classes['flight__schedule']}>
              <table className={classes['flight__schedule-table']}>
                <tr className={classes['flight__schedule-table-row']}>
                  <th className={classes['flight__schedule-table-header']}>MOW – HKT</th>
                  <th className={classes['flight__schedule-table-header']}>В пути</th>
                  <th className={classes['flight__schedule-table-header']}>1 пересадка</th>
                </tr>
                <tr className={classes['flight__schedule-table-row']}>
                  <td className={classes['flight__schedule-table-cell']}>11:20 – 00:50</td>
                  <td className={classes['flight__schedule-table-cell']}>13ч 30м</td>
                  <td className={classes['flight__schedule-table-cell']}>HKG</td>
                </tr>
              </table>
            </div>
          </li>
        </ul>
      </div>
    </li>
  );
}
