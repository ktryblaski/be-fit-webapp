import { Component, Input } from '@angular/core';
import { Ingredient } from '../../../../../shared/model/domain/ingredient';

@Component({
  selector: 'app-meal-details-ingredients-table',
  templateUrl: './meal-details-ingredients-table.component.html',
  styleUrls: ['./meal-details-ingredients-table.component.scss']
})
export class MealDetailsIngredientsTableComponent {

  @Input() ingredients: Ingredient[];

}
