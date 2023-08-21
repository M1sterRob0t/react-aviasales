import { TSegment } from '../../types';

import classes from './Flight.module.scss';

interface IFlightProps {
  className: string;
  segment: TSegment;
}

function getFormattedStopsString(stops: string[]): string {
  switch (stops.length) {
    case 0:
      return 'Без пересадок';
    case 1:
      return '1 пересадка';
    case 2:
    case 3:
    case 4:
      return `${stops.length} пересадки`;
    case 21:
      return '1 пересадка';
    case 22:
    case 23:
    case 24:
      return `${stops.length} пересадки`;
    default:
      return `${stops.length} пересадок`;
  }
}

function getFormattedDurationString(duration: number): string {
  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration - durationHours * 60;

  return durationHours ? `${durationHours}ч ${durationMinutes}м` : `${durationMinutes}м`;
}

function getFormattedTimeString(date: string, durationMin: number): string {
  const takeOffDate = new Date(date);
  const landingDate = new Date(+takeOffDate + durationMin * 60 * 1000);

  const takeOfHours = takeOffDate.getHours() < 10 ? `0${takeOffDate.getHours()}` : takeOffDate.getHours();
  const takeOffMinutes = takeOffDate.getMinutes() < 10 ? `0${takeOffDate.getMinutes()}` : takeOffDate.getMinutes();

  const landingHours = landingDate.getHours() < 10 ? `0${landingDate.getHours()}` : landingDate.getHours();
  const landingMinutes = landingDate.getMinutes() < 10 ? `0${landingDate.getMinutes()}` : landingDate.getMinutes();

  return `${takeOfHours}:${takeOffMinutes} - ${landingHours}:${landingMinutes}`;
}

export function Flight({ className, segment }: IFlightProps): JSX.Element {
  const { origin, destination, duration, stops, date } = segment;

  const durationFormatted = getFormattedDurationString(duration);
  const stopsFormatted = getFormattedStopsString(stops);
  const timeFormatted = getFormattedTimeString(date, duration);

  return (
    <li className={`${className} ${classes['flight']}']`} key={segment.date}>
      <div className={classes['flight__schedule']}>
        <table className={classes['flight__schedule-table']}>
          <tbody>
            <tr className={classes['flight__schedule-table-row']}>
              <th className={classes['flight__schedule-table-header']}>
                {origin} – {destination}
              </th>
              <th className={classes['flight__schedule-table-header']}>В пути</th>
              <th className={classes['flight__schedule-table-header']}>{stopsFormatted}</th>
            </tr>
            <tr className={classes['flight__schedule-table-row']}>
              <td className={classes['flight__schedule-table-cell']}>{timeFormatted}</td>
              <td className={classes['flight__schedule-table-cell']}>{durationFormatted}</td>
              <td className={classes['flight__schedule-table-cell']}>{stops.join(', ')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </li>
  );
}
