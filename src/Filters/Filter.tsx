import classes from './Filters.module.scss';

const Filter = {
  All: {
    text: 'Все',
    name: 'all-transfer-options',
    value: 'all',
  },
  Zero: {
    text: 'Без пересадок',
    name: 'zero-transfers',
    value: '0',
  },
  One: {
    text: '1 пересадка',
    name: 'one-transfer',
    value: '1',
  },
  Two: {
    text: '2 пересадки',
    name: 'two-transfers',
    value: '2',
  },
  Three: {
    text: '3 пересадки',
    name: 'three-transfers',
    value: '3',
  },
};
interface IFiltersProps {
  className: string;
}
export default function Filters({ className }: IFiltersProps): JSX.Element {
  const filters = Object.values(Filter);
  return (
    <section className={`${className} ${classes['filters']}`}>
      <h2 className={classes['filters__title']}>Количество пересадок</h2>
      <ul className={classes['filters__list']}>
        {filters.map((filter) => (
          <li className={classes['filters__item']} key={filter.name}>
            <input
              type="checkbox"
              className={classes['filters__input']}
              id={filter.name}
              name={filter.name}
              value={filter.value}
            />
            <label className={classes['filters__label']} htmlFor={filter.name}>
              {filter.text}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
