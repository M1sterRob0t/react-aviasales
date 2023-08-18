import { useState } from 'react';

import classes from './Sorting.module.scss';

type TSortType = {
  [propertyName: string]: {
    text: string;
    id: string;
    name: string;
    value: string;
  };
};

const SortType: TSortType = {
  Cheapest: {
    text: 'Самый дешевый',
    id: 'sort-type-cheapest',
    name: 'flights',
    value: 'cheapest',
  },
  Fastest: {
    text: 'Самый быстрый',
    id: 'sort-type-fastest',
    name: 'flights',
    value: 'fastest',
  },
  Optimal: {
    text: 'Оптимальный',
    id: 'sort-type-optimal',
    name: 'flights',
    value: 'optimal',
  },
};

const DEAFAULT_SORT_TYPE = SortType.Cheapest.value;

interface ISortingProps {
  className: string;
}

export default function Sorting({ className }: ISortingProps): JSX.Element {
  const [currentSortType, setSortType] = useState(DEAFAULT_SORT_TYPE);
  const sortTypes = Object.values(SortType);

  return (
    <section className={`${className} ${classes['sorting']}`}>
      <ul className={classes['sorting__list']}>
        {sortTypes.map((sortType) => (
          <li className={classes['sorting__item']} key={sortType.id}>
            <input
              type="radio"
              className={classes['sorting__input']}
              id={sortType.id}
              name={sortType.name}
              value={sortType.value}
              checked={sortType.value === currentSortType}
              onChange={(evt) => setSortType(evt.target.value)}
            />
            <label className={classes['sorting__label']} htmlFor={sortType.id}>
              {sortType.text}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
