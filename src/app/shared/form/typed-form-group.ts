import {AbstractControl, FormGroup} from '@angular/forms';
import {AbstractTypedControl} from './abstract-typed-control';

export class TypedFormGroup<T> extends AbstractTypedControl<T> {

  static from<T>(control: AbstractControl): TypedFormGroup<T> {
    return new TypedFormGroup<T>(control as FormGroup);
  }

  protected constructor(ref: FormGroup) {
    super(ref);
  }

}
