import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Sort } from '../../../../shared/component/sort/-model/sort';
import { RecipesSortBy } from '../-model/recipes.sort-by';
import { RecipeLite } from '../../-model/recipe-lite';
import { Pagination } from '../../../../shared/component/pagination/-model/pagination';

@Component({
  selector: 'app-recipes-table',
  templateUrl: './recipes-table.component.html',
  styleUrls: ['./recipes-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesTableComponent {

  readonly RecipesSortBy = RecipesSortBy;

  @Input() recipes: RecipeLite[];
  @Input() sort: Sort<RecipesSortBy>;
  @Input() pagination: Pagination;
  @Input() total: number;
  @Output() clickRow = new EventEmitter<RecipeLite>();
  @Output() sortChange = new EventEmitter<Sort<RecipesSortBy>>();
  @Output() paginationChange = new EventEmitter<Pagination>();

  handleClickRow(recipe: RecipeLite) {
    this.clickRow.next(recipe);
  }

  handleSortChange(sort: Sort<RecipesSortBy>): void {
    this.sortChange.emit(sort);
  }

  handlePaginationChange(pagination: Pagination): void {
    this.paginationChange.emit(pagination);
  }

}
