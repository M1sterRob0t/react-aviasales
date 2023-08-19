import classes from './Logo.module.scss';
import logo from './images/Logo.svg';

export default function Logo(): JSX.Element {
  return (
    <div className={classes['app-logo']}>
      <img className={classes['app-logo__image']} src={logo} width="70" height="70" alt="application logotype" />
    </div>
  );
}
