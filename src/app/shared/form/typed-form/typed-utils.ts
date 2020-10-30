import { AbstractTypedControl, TypedFormArray, TypedFormControl, TypedFormGroup } from './typed-form';
import { defer, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

export type TypedFormControlType<T> = T extends boolean
  ? TypedFormControl<boolean>
  : T extends string
  ? TypedFormControl<string>
  : T extends number
  ? TypedFormControl<number>
  : T extends bigint
  ? TypedFormControl<bigint>
  : T extends (infer U)[]
  ? TypedFormArray<U>
  : T extends object
  ? TypedFormGroup<T>
  : never;

export type ControlsIn<T> = T extends { [key: string]: any } ? { [Key in keyof T]: AbstractTypedControl } : never;

export type InferredControlsIn<T> = T extends { [key: string]: any } ? { [Key in keyof T]: TypedFormControlType<T[Key]> } : never;

// It is needed for 'controls' property in TypedFormGroup<>
// Without this, the TS compiler (with strictTemplates=true checking) has a problem...
// It does not change anything, it just wraps object into object with index signature instead of "usual properties"
export type Properties<T> = { [Key in keyof T]: T[Key] };

export function values$<T>(control: AbstractTypedControl<T>): Observable<T> {
  return defer<Observable<T>>(() => control.valueChanges.pipe(startWith<T, T>(control.value)));
}
