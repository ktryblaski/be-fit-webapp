import {AsyncValidatorFn, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ChangeDetectorRef, Injectable} from '@angular/core';
import {TypedFormControl, TypedFormGroup} from '../../../shared/form/typed-form/typed-form';
import {RegisterFormPasswordValue, RegisterFormValue} from './-model/register-form-value';
import {TypedFormBuilder} from '../../../shared/form/typed-form/typed-form-builder.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {statusChanges$} from '../../../shared/form/typed-form/typed-utils';
import {UserRestService} from '../../../shared/service/rest/user/user-rest.service';

// TODO fix and improve error handling
@Injectable()
export class RegisterFormHandler {

  form: TypedFormGroup<RegisterFormValue>;

  constructor(private cdr: ChangeDetectorRef,
              private fb: TypedFormBuilder,
              private userRestService: UserRestService) {

    this.form = this.fb.group<RegisterFormValue>({
      name: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      surname: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      email: this.fb.control(null, [Validators.required, Validators.email], [this.emailAsyncValidator()]),
      password: this.fb.group<RegisterFormPasswordValue>({
        password: this.fb.control(null),
        confirm: this.fb.control(null)
      }, {validators: this.passwordValidator()})
    }, { updateOn: 'submit' });


    statusChanges$(this.form.controls.password).subscribe(status => {
      const errors = status === 'INVALID' ? { badPassword: true } : null;
      this.form.controls.password.controls.password.setErrors(errors, {emitEvent: false});
      this.form.controls.password.controls.confirm.setErrors(errors, {emitEvent: false});
    });
  }

  getValue(): RegisterFormValue {
    return this.form.value;
  }

  private emailAsyncValidator(): AsyncValidatorFn {
    return (control: TypedFormControl<string>): Observable<ValidationErrors | null> => {
      return this.userRestService.existsByEmail(control.value).pipe(
        tap(() => {
          this.cdr.markForCheck();
        }),
        map(exists => {
          return exists ? { emailAlreadyExists: true } : null;
        })
      );
    };
  }

  private passwordValidator(): ValidatorFn {
    return (control: TypedFormGroup<RegisterFormPasswordValue>): ValidationErrors | null => {
      const valid = !!control.controls.password.value && control.controls.password.value === control.controls.confirm.value;
      return valid ? null : { badPassword: true };
    };
  }

}
