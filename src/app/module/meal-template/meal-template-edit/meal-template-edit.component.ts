import {Component, OnDestroy, OnInit} from '@angular/core';
import {MealTemplateEditService} from './meal-template-edit.service';
import {Observable, Subscription} from 'rxjs';
import {MealTemplateFormHandler} from '../meal-template-form/meal-template-form-handler';
import {ActivatedRoute, Router} from '@angular/router';
import {MealTemplateFormDataSource} from '../meal-template-form/-model/meal-template-form-data-source';
import {MealTemplate} from '../../../shared/model/domain/meal-template';
import {MealTemplateFormValue} from '../meal-template-form/-model/meal-template-form-value';

@Component({
  selector: 'app-meal-template-edit',
  templateUrl: './meal-template-edit.component.html',
  styleUrls: ['./meal-template-edit.component.scss'],
  providers: [MealTemplateEditService]
})
export class MealTemplateEditComponent implements OnInit, OnDestroy {

  formHandler: MealTemplateFormHandler = new MealTemplateFormHandler();

  saving$: Observable<boolean>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  mealTemplate$: Observable<MealTemplate>;
  dataSource$: Observable<MealTemplateFormDataSource>;

  private subscription: Subscription;

  constructor(private service: MealTemplateEditService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.saving$ = this.service.saving$;
    this.loading$ = this.service.loading$;
    this.loaded$ = this.service.loaded$;
    this.mealTemplate$ = this.service.mealTemplate$;
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
