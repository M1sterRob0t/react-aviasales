import classes from './Button.module.scss';

export default function Button(): JSX.Element {
  return <button className={classes['airline__show-more-button']}>Показать еще 5 билетов!</button>;
}
