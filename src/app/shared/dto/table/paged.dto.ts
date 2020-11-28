import { SortDTO } from './sort.dto';
import { PageableDTO } from './pageable.dto';

export interface PagedDTO<T = any> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: PageableDTO;
  size: number;
  sort: SortDTO;
  totalElements: number;
  totalPages: number;
}
