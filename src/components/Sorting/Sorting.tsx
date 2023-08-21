/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector, useDispatch } from 'react-redux';

import { changeSortTypeAction } from '../../store/reducer';
import { SortType } from '../../constants';
import { TSort, TState } from '../../types';

import classes from './Sorting.module.scss';

interface ISortingProps {
  className: string;
}

export default function Sorting({ className }: ISortingProps): JSX.Element {
  const currentSortType = useSelector<TState, TSort>((state) => state.flights.sortType);
  const dispatch = useDispatch();
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
              defaultChecked={sortType.id === currentSortType.id}
              onChange={(evt) => dispatch(changeSortTypeAction(SortType[evt.target.value]))}
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
