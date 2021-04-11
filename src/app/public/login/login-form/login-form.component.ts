import {Component, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {LoginFormHandler} from './login-form-handler';
import {LoginFormValue} from './-model/login-form-value';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginFormHandler]
})
export class LoginFormComponent {

  @Output() login = new EventEmitter<LoginFormValue>();

  constructor(public formHandler: LoginFormHandler) { }

  handleSubmit(): void {
    if (this.formHandler.form.status === 'VALID') {
      this.login.emit(this.formHandler.getValue());
    }

  }
}
