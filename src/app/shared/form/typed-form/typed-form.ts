import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ControlsIn, InferredControlsIn, Properties, InferredTypedControl } from './typed-utils';

export interface TypedAbstractControl<T = any> extends AbstractControl {
  value: T;
  valueChanges: Observable<T>;
}

export interface TypedFormControl<T> extends TypedAbstractControl<T>, FormControl {
  value: T;
  valueChanges: Observable<T>;
  setValue: (
    value: T,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    }
  ) => void;
  patchValue: (
    value: Partial<T>,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    }
  ) => void;
  reset: (
    formState?: T,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ) => void;
}

export interface TypedFormGroup<T, C extends ControlsIn<T> = InferredControlsIn<T>> extends TypedAbstractControl<T>, FormGroup {
  value: T;
  valueChanges: Observable<T>;
  controls: Properties<C>;
  setValue: (
    value: T,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ) => void;
  patchValue: (
    value: Partial<T>,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ) => void;
  reset: (
    value: T,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ) => void;
}

export interface TypedFormArray<T, C extends TypedAbstractControl = InferredTypedControl<T>> extends TypedAbstractControl<T[]>, FormArray {
  value: T[];
  valueChanges: Observable<T[]>;
  controls: C[];
  at: (index: number) => C;
  push: (control: C) => void;
  insert: (index: number, control: C) => void;
  setControl: (index: number, control: C) => void;
  setValue: (
    value: T[],
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ) => void;
  patchValue: (
    value: T[],
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ) => void;
  reset: (
    value: T,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ) => void;
}
