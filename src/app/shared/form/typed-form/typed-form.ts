import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ControlsIn, InferredControlsIn, Properties, TypedFormControlType } from './typed-utils';

export interface AbstractTypedControl<T = any> extends AbstractControl {
  value: T;
  valueChanges: Observable<T>;
}

export interface TypedFormControl<T> extends AbstractTypedControl<T>, FormControl {
  value: T;
  valueChanges: Observable<T>;
  setValue: (value: T, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }) => void;
  patchValue: (value: Partial<T>, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }) => void;
  reset: (formState?: T, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }) => void;
}

export interface TypedFormGroup<T, C extends ControlsIn<T> = InferredControlsIn<T>> extends AbstractTypedControl<T>, FormGroup {
  value: T;
  valueChanges: Observable<T>;
  controls: Properties<C>;
  setValue: (value: T, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }) => void;
  patchValue: (value: Partial<T>, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }) => void;
  reset: (value: T, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }) => void;
}

export interface TypedFormArray<T> extends AbstractTypedControl<T[]>, FormArray {
  value: T[];
  valueChanges: Observable<T[]>;
  controls: TypedFormControlType<T>[];
  at: (index: number) => TypedFormControlType<T>;
  push: (control: TypedFormControlType<T>) => void;
  insert: (index: number, control: TypedFormControlType<T>) => void;
  setControl: (index: number, control: TypedFormControlType<T>) => void;
  setValue: (value: T[], options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }) => void;
  patchValue: (value: T[], options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }) => void;
  reset: (value: T, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }) => void;
}
