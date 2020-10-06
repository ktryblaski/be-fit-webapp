import { Component, OnInit } from '@angular/core';
import { MealTemplateFormHandler } from '../meal-template-form/meal-template-form-handler';
import { MealTemplateCreateService } from './meal-template-create.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MealTemplateFormValue } from '../meal-template-form/-shared/meal-template-form-value';
import { MealTemplateFormDataSource } from '../meal-template-form/-shared/meal-template-form-data-source';

@Component({
  selector: 'app-meal-template-create',
  templateUrl: './meal-template-create.component.html',
  styleUrls: ['./meal-template-create.component.scss'],
  providers: [MealTemplateCreateService]
})
export class MealTemplateCreateComponent implements OnInit {

  formHandler: MealTemplateFormHandler = new MealTemplateFormHandler();

  saving$: Observable<boolean>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  dataSource$: Observable<MealTemplateFormDataSource>;

  constructor(private service: MealTemplateCreateService,
              private router: Router) { }

  ngOnInit(): void {
    this.saving$ = this.service.saving$;
    this.loading$ = this.service.loading$;
    this.loaded$ = this.service.loaded$;
    this.dataSource$ = this.service.dataSource$;

    this.service.load();
  }

  handleCreate(formValue: MealTemplateFormValue): void {
    this.service.save(formValue);
  }

  handleCancel(): void {
    this.router.navigate(['meal-template']);
  }
}
