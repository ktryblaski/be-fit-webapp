import {Component, Input} from '@angular/core';
import {Meal} from "../../../../shared/model/domain/meal";

@Component({
  selector: 'app-meal-details-data',
  templateUrl: './meal-details-data.component.html',
  styleUrls: ['./meal-details-data.component.scss']
})
export class MealDetailsDataComponent {

  @Input() meal: Meal;

}
