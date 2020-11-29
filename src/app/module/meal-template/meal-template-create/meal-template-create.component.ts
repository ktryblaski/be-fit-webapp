import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MealTemplateCreateService } from './meal-template-create.service';
import { combineLatest, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MealTemplateFormValue } from '../meal-template-form/-shared/meal-template-form-value';
import { MealTemplateFormDataSource } from '../meal-template-form/-shared/meal-template-form-data-source';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-meal-template-create',
  templateUrl: './meal-template-create.component.html',
  styleUrls: ['./meal-template-create.component.scss'],
  providers: [MealTemplateCreateService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealTemplateCreateComponent implements OnInit {

  dataSource$: Observable<MealTemplateFormDataSource>;
  loaded$: Observable<boolean>;
  pending$: Observable<boolean>;

  constructor(private service: MealTemplateCreateService,
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

  handleCreate(formValue: MealTemplateFormValue): void {
    this.service.save(formValue);
  }

  handleCancel(): void {
    this.router.navigate(['meal-template']);
  }

}
