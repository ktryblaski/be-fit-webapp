import {AbstractControl} from '@angular/forms';
import {Observable} from 'rxjs';

export interface TypedControl<T> {
  ref: AbstractControl;

  readonly value: T;
  readonly values: Observable<T>;
  readonly valueChanges: Observable<T>;
  readonly valid: boolean;
  readonly invalid: boolean;
}
