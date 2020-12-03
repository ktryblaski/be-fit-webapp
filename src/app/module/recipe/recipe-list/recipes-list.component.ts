import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RecipesListService } from './recipes-list.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Recipe } from '../../../shared/model/domain/recipe';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  providers: [RecipesListService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesListComponent implements OnInit {

  public recipes$: Observable<Recipe[]>;
  public loaded$: Observable<boolean>;
  public loading$: Observable<boolean>;

  constructor(private service: RecipesListService,
              private router: Router) { }

  ngOnInit(): void {
    this.recipes$ = this.service.recipes$;
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;

    this.service.load();
  }

  handleClickRow(recipe: Recipe): void {
    this.router.navigate(['recipe', recipe.id]);
  }

  handleAddNewRecipe(): void {
    this.router.navigate(['recipe', 'new']);
  }

}
