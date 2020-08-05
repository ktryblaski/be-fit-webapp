import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Meal} from "../../../shared/model/domain/meal";
import {Diet} from "../../../shared/model/domain/diet";
import * as moment from 'moment';
import {BehaviorSubject, Observable} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";

export class DietFormHandler {

  readonly form: FormGroup;

  private readonly meals = new BehaviorSubject<Meal[]>([]);
  readonly meals$: Observable<Meal[]> = this.meals.pipe(distinctUntilChanged());

  private get _meals(): Meal[] {
    return this.form.get('meals').value as Meal[];
  }

  constructor(diet?: Diet) {
    this.form = this.createEmptyForm();

    if(diet) {
      this.patchDiet(diet);
    }
  }

  public addMeal(meal: Meal): void {
    const meals = [...this._meals, meal];

    this.form.patchValue({
      meals: meals
    });

    this.meals.next([...meals]);
  }

  public removeMeal(meal: Meal): void {
    const meals = this._meals.filter(m => m !== meal);

    this.form.patchValue({
      meals: meals
    });

    this.meals.next([...meals]);
  }

  private createEmptyForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      type: new FormControl(null, Validators.required),
      dates: new FormGroup({
        startDate: new FormControl(moment().toDate()),
        endDate: new FormControl(moment().add(1, 'months').toDate()),
      }, [this.ValidateDates.bind(this)]),
      meals: new FormControl([]),
      meal: new FormControl(null),
    })
  }

  private patchDiet(diet: Diet): void {
    // this.form.patchValue({
    //   name: meal.name,
    //   description: meal.description
    // });
    //
    // (meal.ingredients || []).forEach((ingredient: Ingredient) => {
    //   this.addIngredient(ingredient.product, ingredient.weight);
    // });
  }

  private ValidateDates(control: AbstractControl): {[key: string]: boolean} | null {
    const startControl = control.get('startDate').value as Date;
    const endControl = control.get('endDate').value as Date;

    if(!startControl || !endControl || (endControl.getTime() > startControl.getTime())) {
      return null;
    }

    return {'invalidEndDate': true}
  }

}
