import { AbstractControl, FormArray } from '@angular/forms';
import { AbstractTypedControl } from './abstract-typed-control';

// TODO
export class TypedFormArray<T> extends AbstractTypedControl<T, FormArray> {
  static from<T>(control: AbstractControl): TypedFormArray<T> {
    return new TypedFormArray<T>(control as FormArray);
  }

  // static of<T>(value: {[key: string]: any}): TypedFormControl<T> {
  //   return this.from<T>(new FormControl(value));
  // }

  protected constructor(ref: FormArray = new FormArray([])) {
    super(ref);
  }

  setValue(
    value: any[],
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ): void {
    this.ref.setValue(value, options);
  }

  push(control: AbstractControl): void {
    (this.ref as FormArray).push(control);
  }

  at(index: number): AbstractControl {
    return (this.ref as FormArray).at(index);
  }

  removeAt(index: number): void {
    (this.ref as FormArray).removeAt(index);
  }

  get length(): number {
    return (this.ref as FormArray).length;
  }

  get controls(): AbstractControl[] {
    return (this.ref as FormArray).controls;
  }
}
