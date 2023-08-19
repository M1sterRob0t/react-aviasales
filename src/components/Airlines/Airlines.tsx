import Airline from '../Airline/Airline';
import Button from '../Button';

import classes from './Airlines.module.scss';

export default function Airlines(): JSX.Element {
  return (
    <section className={classes['airlines']}>
      <ul className={classes['airlines__list']}>
        <Airline className={classes['airlines__item']} />
        <Airline className={classes['airlines__item']} />
        <Airline className={classes['airlines__item']} />
        <Airline className={classes['airlines__item']} />
        <Airline className={classes['airlines__item']} />
      </ul>
      <Button />
    </section>
  );
}
