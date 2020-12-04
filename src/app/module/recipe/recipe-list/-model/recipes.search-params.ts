import { Sort } from '../../../../shared/component/sort/-model/sort';
import { Pagination } from '../../../../shared/component/pagination/-model/pagination';
import { RecipesSortBy } from './recipes.sort-by';

export interface RecipesSearchParams {
  sort?: Sort<RecipesSortBy>;
  pagination?: Pagination;
}
