export type TSortType = {
  [propertyName: string]: {
    text: string;
    id: string;
    name: string;
    value: string;
  };
};

export type TSort = {
  text: string;
  id: string;
  name: string;
  value: string;
};

export type TFilterType = {
  [propertyName: string]: {
    text: string;
    name: string;
    value: string;
  };
};

export type TFilter = {
  text: string;
  name: string;
  value: string;
};

export type TState = {
  flights: {
    sortType: TSort;
    filters: TFilter[];
  };
};

export type TAction = {
  type: string;
  payload: string | number;
};
