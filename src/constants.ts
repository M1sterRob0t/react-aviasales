import { TSortType, TFilterType } from './types';

export const SortType: TSortType = {
  Cheapest: {
    text: 'Самый дешевый',
    id: 'sort-type-cheapest',
    name: 'flights',
    value: 'Cheapest',
  },
  Fastest: {
    text: 'Самый быстрый',
    id: 'sort-type-fastest',
    name: 'flights',
    value: 'Fastest',
  },
  Optimal: {
    text: 'Оптимальный',
    id: 'sort-type-optimal',
    name: 'flights',
    value: 'Optimal',
  },
};

export const FilterType: TFilterType = {
  All: {
    text: 'Все',
    name: 'all-transfer-options',
    value: 'all',
  },
  Zero: {
    text: 'Без пересадок',
    name: 'zero-transfers',
    value: 'zero',
  },
  One: {
    text: '1 пересадка',
    name: 'one-transfer',
    value: 'one',
  },
  Two: {
    text: '2 пересадки',
    name: 'two-transfers',
    value: 'two',
  },
  Three: {
    text: '3 пересадки',
    name: 'three-transfers',
    value: 'three',
  },
};
