import { ProductsSortBy } from './products.sort-by';
import { Sort } from '../../../../../shared/component/sort/-model/sort';
import { Pagination } from '../../../../../shared/component/pagination/-model/pagination';

export interface ProductParams {
  sort?: Sort<ProductsSortBy>;
  pagination?: Pagination;
}
