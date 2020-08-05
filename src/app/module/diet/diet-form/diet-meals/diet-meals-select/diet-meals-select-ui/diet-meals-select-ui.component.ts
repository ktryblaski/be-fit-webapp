import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MealView} from "../../../../../../shared/model/domain/meal";
import {DietFormHandler} from "../../../diet-form-handler";
import {merge, Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-diet-meals-select-ui',
  templateUrl: './diet-meals-select-ui.component.html',
  styleUrls: ['./diet-meals-select-ui.component.scss']
})
export class DietMealsSelectUiComponent implements OnInit, OnChanges {

  @Input() meals: MealView[];
  @Input() formHandler: DietFormHandler
  @Output() addMeal: EventEmitter<MealView> = new EventEmitter<MealView>();

  private readonly _meals = new Subject<void>();

  meals$: Observable<MealView[]>;

  ngOnInit(): void {
    this.meals$ = merge(
      this.formHandler.form.get('meal').valueChanges,
      this._meals.pipe()
    ).pipe(
      map(() => {
        return this.filter(this.meals, this.formHandler.form.get('meal').value);
      })
    );
  }

  ngOnChanges(): void {
    this._meals.next();
  }

  displayFn(meal: MealView): string {
    return meal?.name || '';
  }

  private filter(meals: MealView[], value: any): MealView[] {
    if(!value || typeof value !== 'string') {
      return meals;
    }

    return meals.filter(p => p.name.indexOf(value) > -1);
  }

}
