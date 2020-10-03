import {AbstractControl, FormControl} from '@angular/forms';
import {AbstractTypedControl} from './abstract-typed-control';

export class TypedFormControl<T> extends AbstractTypedControl<T> {

  static from<T>(control: AbstractControl): TypedFormControl<T> {
    return new TypedFormControl<T>(control as FormControl);
  }

  static of<T>(value: {[key: string]: any}): TypedFormControl<T> {
    return this.from<T>(new FormControl(value));
  }

  private constructor(ref: FormControl = new FormControl(null)) {
    super(ref);
  }

  setValue(value: any, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }): void {
    this.ref.setValue(value, options);
  }

  reset(formState?: any, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void {
    this.ref.reset(formState, options);
  }

  get empty(): boolean {
    return this.ref.value === null || this.ref.value === undefined || this.ref.value === '' || this.ref.value === [];
  }

}
