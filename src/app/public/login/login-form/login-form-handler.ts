import {ChangeDetectorRef, Injectable} from '@angular/core';
import { TypedFormGroup} from '../../../shared/form/typed-form/typed-form';
import {TypedFormBuilder} from '../../../shared/form/typed-form/typed-form-builder.service';
import { Validators} from '@angular/forms';
import {LoginFormValue} from './-model/login-form-value';

@Injectable()
export class LoginFormHandler {

  form: TypedFormGroup<LoginFormValue>;

  constructor(private cdr: ChangeDetectorRef,
              private fb: TypedFormBuilder) {

    this.form = this.fb.group<LoginFormValue>({
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.required])
    }, { updateOn: 'submit' });
  }

  getValue(): LoginFormValue {
    return this.form.value;
  }
}
