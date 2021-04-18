import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RecipeCreateService } from './recipe-create.service';
import { combineLatest, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RecipeFormValue } from '../recipe-form/-shared/recipe-form-value';
import { RecipeFormDataSource } from '../recipe-form/-shared/recipe-form-data-source';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss'],
  providers: [RecipeCreateService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCreateComponent implements OnInit {

  dataSource$: Observable<RecipeFormDataSource>;
  loaded$: Observable<boolean>;
  pending$: Observable<boolean>;

  constructor(private service: RecipeCreateService,
              private router: Router) {}

  ngOnInit(): void {
    this.dataSource$ = this.service.dataSource$;
    this.loaded$ = this.service.loaded$;
    this.pending$ = combineLatest([
      this.service.loading$,
      this.service.saving$
    ]).pipe(map(([loading, saving]) => loading || saving));

    this.service.load();
  }

  handleCreate(formValue: RecipeFormValue): void {
    this.service.save(formValue);
  }

  handleCancel(): void {
    this.router.navigate(['recipe']);
  }

}
