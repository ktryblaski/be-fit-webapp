import { SortDTO } from './sort.dto';

export interface PageableDTO {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: SortDTO;
  unpaged: boolean;
}
