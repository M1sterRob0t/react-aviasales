import classes from './Button.module.scss';

interface IButtonProps {
  onClick: () => void;
  isShown: boolean;
}

export default function Button({ onClick, isShown }: IButtonProps): JSX.Element {
  return (
    <button
      className={classes['airline__show-more-button']}
      onClick={onClick}
      style={{ display: isShown ? 'block' : 'none' }}
    >
      Показать еще 5 билетов!
    </button>
  );
}
