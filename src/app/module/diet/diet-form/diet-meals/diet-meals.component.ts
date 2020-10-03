import {Component, Input} from '@angular/core';
import {DietFormHandler} from '../diet-form-handler';
import {MealView} from '../../../../shared/model/domain/meal';

@Component({
  selector: 'app-diet-meals',
  templateUrl: './diet-meals.component.html',
  styleUrls: ['./diet-meals.component.scss']
})
export class DietMealsComponent {

  @Input() formHandler: DietFormHandler;

  handleAddMeal(meal: MealView): void {
    this.formHandler.form.get('meal').reset();
    this.formHandler.addMeal(meal);
  }

  handleRemoveMeal(meal: MealView): void {
    this.formHandler.removeMeal(meal);
  }
}
