import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RecipesListService } from './recipes-list.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RecipeLite } from '../-model/recipe-lite';
import { RecipesSortBy } from './-model/recipes.sort-by';
import { ascending, Sort } from '../../../shared/component/sort/-model/sort';
import { Pagination } from '../../../shared/component/pagination/-model/pagination';
import { Paged } from '../../../shared/model/table/paged';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  providers: [RecipesListService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesListComponent implements OnInit {

  recipes$: Observable<RecipeLite[]>;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  total$: Observable<number>;

  sort: Sort<RecipesSortBy> | null = ascending(RecipesSortBy.NAME);
  pagination: Pagination = { page: 1, pageSize: 10 };

  constructor(private service: RecipesListService,
              private router: Router) { }

  ngOnInit(): void {
    this.recipes$ = this.service.recipes$.pipe(
      tap(page => {
        this.pagination = { page: page.page + 1, pageSize: page.pageSize };
      }),
      map(page => page.results)
    );
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;
    this.total$ = this.service.recipes$.pipe(
      map(page => page.total)
    );

    this.load();
  }

  handleClickRow(recipe: RecipeLite): void {
    this.router.navigate(['recipe', recipe.id]);
  }

  handleAddNewRecipe(): void {
    this.router.navigate(['recipe', 'new']);
  }

  handleSortChange(sort: Sort<RecipesSortBy>): void {
    this.sort = sort ? { ...sort } : null;
    this.load();
  }

  handlePaginationChange(pagination: Pagination): void {
    this.pagination = { ...pagination };
    this.load();
  }

  private load(): void {
    this.service.load({ sort: this.sort, pagination: this.pagination });
  }

}
