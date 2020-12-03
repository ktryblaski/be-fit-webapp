import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeEditService } from './recipe-edit.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeFormDataSource } from '../recipe-form/-shared/recipe-form-data-source';
import { Recipe } from '../../../shared/model/domain/recipe';
import { RecipeFormValue } from '../recipe-form/-shared/recipe-form-value';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  providers: [RecipeEditService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  recipe$: Observable<Recipe | null>;
  loaded$: Observable<boolean>;
  pending$: Observable<boolean>;
  dataSource$: Observable<RecipeFormDataSource | null>;

  constructor(private service: RecipeEditService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.recipe$ = this.service.recipe$;
    this.loaded$ = this.service.loaded$;
    this.pending$ = combineLatest([
      this.service.loading$,
      this.service.saving$
    ]).pipe(map(([loading, saving]) => loading || saving));
    this.dataSource$ = this.service.dataSource$;

    this.subscription = this.route.paramMap.subscribe(paramMap => {
      this.service.load(+paramMap.get('id'));
    });
  }

  handleUpdate(formValue: RecipeFormValue): void {
    this.service.save(formValue);
  }

  handleCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
