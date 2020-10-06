import { Component, Input } from '@angular/core';
import { DayOfEatingFormHandler } from '../day-of-eating-form-handler';
import { ControlContainer, FormArray, FormGroup, FormGroupDirective } from '@angular/forms';
import { Product } from '../../../../shared/model/domain/product';

@Component({
  selector: 'app-day-of-eating-form-ingredients',
  templateUrl: './day-of-eating-form-ingredients.component.html',
  styleUrls: ['./day-of-eating-form-ingredients.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class DayOfEatingFormIngredientsComponent {

  @Input() mealIdx: number;
  @Input() products: Product[];

  constructor(public formHandler: DayOfEatingFormHandler) { }

  get ingredients(): FormGroup[] {
    return (this.formHandler.meals.at(this.mealIdx).get('ingredients') as FormArray).controls as FormGroup[];
  }

  removeIngredient(ingredientIdx: number): void {
    this.formHandler.removeIngredient(this.mealIdx, ingredientIdx);
  }

}
