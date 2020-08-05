import {Component, Input} from '@angular/core';
import {DietFormHandler} from "../diet-form-handler";
import {Meal} from "../../../../shared/model/domain/meal";

@Component({
  selector: 'app-diet-meals',
  templateUrl: './diet-meals.component.html',
  styleUrls: ['./diet-meals.component.scss']
})
export class DietMealsComponent {

  @Input() formHandler: DietFormHandler;

  handleAddMeal(meal: Meal): void {
    this.formHandler.form.get('meal').reset();
    this.formHandler.addMeal(meal);
  }

  handleRemoveMeal(meal: Meal): void {
    this.formHandler.removeMeal(meal);
  }
}
