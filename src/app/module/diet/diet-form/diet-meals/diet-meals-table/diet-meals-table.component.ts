import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DietFormHandler} from "../../diet-form-handler";
import {MealView} from "../../../../../shared/model/domain/meal";

@Component({
  selector: 'app-diet-meals-table',
  templateUrl: './diet-meals-table.component.html',
  styleUrls: ['./diet-meals-table.component.scss']
})
export class DietMealsTableComponent implements OnInit {

  @Input() formHandler: DietFormHandler
  @Output() removeMeal: EventEmitter<MealView> = new EventEmitter<MealView>();

  constructor() { }

  ngOnInit(): void {
  }

}
