import { AfterViewInit, Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MealTemplateFormIngredientValue } from '../../-shared/meal-template-form-value';
import { TypedFormControl } from '../../../../../shared/form/typed/typed-form-control';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tr[app-meal-template-form-ingredient-row]',
  templateUrl: './meal-template-form-ingredient-row.component.html',
  styleUrls: ['./meal-template-form-ingredient-row.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MealTemplateFormIngredientRowComponent),
      multi: true
    }
  ]
})
export class MealTemplateFormIngredientRowComponent implements ControlValueAccessor, AfterViewInit {

  @Output() removeIngredient = new EventEmitter();

  value: MealTemplateFormIngredientValue;
  weight: TypedFormControl<number>;
  weight$: Observable<number>;

  constructor() {
    this.weight = TypedFormControl.of<number>(0);
  }

  ngAfterViewInit(): void {
    this.weight.values.subscribe(weight => {
      this.value.weight = weight;
      setTimeout(() => {
        this.onChanged(this.value);
      }, 0);
    });
  }

  onChanged: any = () => {};
  onTouched: any = () => {};

  writeValue(value: MealTemplateFormIngredientValue): void {
    this.value = value;
    this.weight.setValue(value.weight);
  }

  registerOnChange(fn: (v: any) => void): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  handleRemoveIngredient(): void {
    this.removeIngredient.emit();
  }

}
