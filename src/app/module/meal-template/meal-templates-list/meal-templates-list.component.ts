import { Component, OnInit } from '@angular/core';
import { MealTemplatesListService } from './meal-templates-list.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MealTemplate } from '../../../shared/model/domain/meal-template';

@Component({
  selector: 'app-meal-templates-list',
  templateUrl: './meal-templates-list.component.html',
  styleUrls: ['./meal-templates-list.component.scss'],
  providers: [MealTemplatesListService]
})
export class MealTemplatesListComponent implements OnInit {

  public mealTemplates$: Observable<MealTemplate[]>;
  public loaded$: Observable<boolean>;
  public loading$: Observable<boolean>;

  constructor(private service: MealTemplatesListService,
              private router: Router) { }

  ngOnInit(): void {
    this.mealTemplates$ = this.service.mealTemplates$;
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;

    this.service.load();
  }

  handleClick(mealTemplate: MealTemplate): void {
    this.router.navigate(['meal-template', mealTemplate.id]);
  }

  handleAddNewMealTemplate(): void {
    this.router.navigate(['meal-template', 'new']);
  }

}
