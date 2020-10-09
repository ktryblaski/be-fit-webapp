import { Component, OnDestroy, OnInit } from '@angular/core';
import { MealTemplateEditService } from './meal-template-edit.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MealTemplateFormDataSource } from '../meal-template-form/-shared/meal-template-form-data-source';
import { MealTemplate } from '../../../shared/model/domain/meal-template';
import { MealTemplateFormValue } from '../meal-template-form/-shared/meal-template-form-value';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-meal-template-edit',
  templateUrl: './meal-template-edit.component.html',
  styleUrls: ['./meal-template-edit.component.scss'],
  providers: [MealTemplateEditService]
})
export class MealTemplateEditComponent implements OnInit, OnDestroy {

  mealTemplate$: Observable<MealTemplate>;
  loaded$: Observable<boolean>;
  pending$: Observable<boolean>;
  dataSource$: Observable<MealTemplateFormDataSource>;

  private subscription: Subscription;

  constructor(private service: MealTemplateEditService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.mealTemplate$ = this.service.mealTemplate$;
    this.loaded$ = this.service.loaded$;
    this.pending$ = combineLatest([this.service.loading$, this.service.saving$]).pipe(
      map(([loading, saving]) => loading || saving)
    );
    this.dataSource$ = this.service.dataSource$;

    this.subscription = this.route.paramMap.subscribe(paramMap => {
      this.service.load(+paramMap.get('id'));
    });
  }

  handleUpdate(formValue: MealTemplateFormValue): void {
    this.service.save(formValue);
  }

  handleCancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
