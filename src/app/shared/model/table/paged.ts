import { PagedDTO } from '../../dto/table/paged.dto';

export interface Paged<T = any> {
  results: T[];
  page: number;
  pageSize: number;
  total: number;
}

export function fromDTO<T = any>(page: PagedDTO<T>): Paged<T> {
  return {
    results: page.content,
    page: page.number,
    pageSize: page.size,
    total: page.totalElements
  };
}
