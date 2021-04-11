import { Injectable, OnDestroy } from '@angular/core';
import { DayOfEatingBeginFormValue } from './model/day-of-eating-begin-form-value';
import { noop, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TypedFormGroup } from '../../../../../shared/form/typed-form/typed-form';
import { TypedFormBuilder } from '../../../../../shared/form/typed-form/typed-form-builder.service';
import { DayOfEatingBeginForm, DayOfEatingBeginFormControls } from './model/day-of-eating-begin-form';
import { values$ } from '../../../../../shared/form/typed-form/typed-utils';
import { Validators } from '@angular/forms';
import { DayOfEatingBeginOrigin } from '../-model/day-of-eating-begin-origin';

@Injectable()
export class DayOfEatingBeginFormHandler implements OnDestroy {

  private subscription: Subscription;

  form: TypedFormGroup<DayOfEatingBeginForm, DayOfEatingBeginFormControls>;

  constructor(private fb: TypedFormBuilder) {

    this.form = this.fb.group<DayOfEatingBeginForm, DayOfEatingBeginFormControls>({
      origin: this.fb.control<DayOfEatingBeginOrigin>(DayOfEatingBeginOrigin.NEW, Validators.required),
      originDayDate: this.fb.control(null, { validators: Validators.required, updateOn: 'submit' })
    });

    this.subscription = values$(this.form.controls.origin).pipe(
      tap(origin => {
        if (DayOfEatingBeginOrigin.AS_COPY === origin) {
          this.form.controls.originDayDate.enable();
        } else {
          this.form.controls.originDayDate.setValue(null);
          this.form.controls.originDayDate.disable();
        }
      })
    ).subscribe(noop);

    this.form.controls.originDayDate.disable();
  }

  getValue(): DayOfEatingBeginFormValue {
    return this.form.value;
  }

  setOriginDayDateValue(date: Date): void {
    this.form.controls.originDayDate.setValue(date);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
