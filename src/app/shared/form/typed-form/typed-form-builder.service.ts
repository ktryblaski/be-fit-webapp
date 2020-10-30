import { Injectable } from '@angular/core';
import { AbstractControlOptions, AsyncValidatorFn, FormBuilder, ValidatorFn } from '@angular/forms';
import { ControlsIn, InferredControlsIn, TypedFormControlType } from './typed-utils';
import { TypedFormArray, TypedFormControl, TypedFormGroup } from './typed-form';

@Injectable({
  providedIn: 'root'
})
export class TypedFormBuilder {

  constructor(private fb: FormBuilder) { }

  group<T, C extends ControlsIn<T> = InferredControlsIn<T>>(
    controlsConfig: C,
    options?: AbstractControlOptions | { [key: string]: any } | null): TypedFormGroup<T, C> {

    return this.fb.group(controlsConfig, options) as any;
  }

  control<T>(
    formState: T | null = null,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null): TypedFormControl<T> {

    return this.fb.control(formState, validatorOrOpts, asyncValidator) as any;
  }

  array<T>(
    controlsConfig: TypedFormControlType<T>[] = [],
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null): TypedFormArray<T> {

    return this.fb.array(controlsConfig, validatorOrOpts, asyncValidator) as any;
  }

}
