import {Component, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy} from '@angular/core';
import {RegisterFormValue} from './-model/register-form-value';
import {RegisterFormHandler} from './register-form-handler';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegisterFormHandler]
})
export class RegisterFormComponent implements OnDestroy {

  @Output() register = new EventEmitter<RegisterFormValue>();

  private subscription: Subscription;

  constructor(public formHandler: RegisterFormHandler) { }

  handleSubmit(): void {
    this.unsubscribe();
    this.subscription = this.formHandler.form.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.register.emit(this.formHandler.getValue());
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  private unsubscribe(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

}
