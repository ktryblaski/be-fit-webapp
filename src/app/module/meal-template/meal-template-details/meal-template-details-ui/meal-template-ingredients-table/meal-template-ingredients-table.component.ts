import {Component, Input} from '@angular/core';
import {Ingredient} from '../../../../../shared/model/domain/ingredient';

@Component({
  selector: 'app-meal-template-ingredients-table',
  templateUrl: './meal-template-ingredients-table.component.html',
  styleUrls: ['./meal-template-ingredients-table.component.scss']
})
export class MealTemplateIngredientsTableComponent {

  @Input() ingredients: Ingredient[];

}
