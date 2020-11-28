import { SortOrder } from './sort-order';

export interface Sort<T extends string = string> {
  sortBy: T;
  sortOrder: SortOrder;
}

export function ascending<T extends string = string>(sortBy: T): Sort<T> {
  return { sortBy, sortOrder: SortOrder.ASC }
}

export function descending<T extends string = string>(sortBy: T): Sort<T> {
  return { sortBy, sortOrder: SortOrder.DESC }
}
