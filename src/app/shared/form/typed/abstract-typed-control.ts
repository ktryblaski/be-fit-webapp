import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TypedControl } from './typed-control';
import { startWith } from 'rxjs/operators';

export abstract class AbstractTypedControl<T> implements TypedControl<T> {

  protected constructor(public ref: AbstractControl) { }

  get value(): T {
    return this.ref.value;
  }

  get values(): Observable<T> {
    return this.ref.valueChanges.pipe(
      startWith<T, T>(this.ref.value)
    );
  }

  get valueChanges(): Observable<T> {
    return this.ref.valueChanges;
  }

  get valid(): boolean {
    return this.ref.valid;
  }

  get invalid(): boolean {
    return this.ref.invalid;
  }

}
