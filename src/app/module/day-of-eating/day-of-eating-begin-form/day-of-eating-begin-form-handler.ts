import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypedFormControl } from '../../../shared/form/typed/typed-form-control';
import { DayOfEatingBeginFormValue } from './-shared/day-of-eating-begin-form-value';
import { noop, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DayOfEatingBeginOrigin } from '../../../shared/model/dto/day-of-eating-begin-dto';

@Injectable()
export class DayOfEatingBeginFormHandler implements OnDestroy {

  private subscription: Subscription;

  form: FormGroup;

  readonly origin: TypedFormControl<DayOfEatingBeginOrigin>;
  readonly originDayDate: TypedFormControl<Date>;

  constructor() {
    this.form = new FormGroup({
      origin: new FormControl(DayOfEatingBeginOrigin.NEW, Validators.required),
      originDayDate: new FormControl(null, Validators.required)
    });

    this.origin = TypedFormControl.from(this.form.get('origin'));
    this.originDayDate = TypedFormControl.from(this.form.get('originDayDate'));

    this.subscription = this.origin.values.pipe(
      tap(origin => {
        if (DayOfEatingBeginOrigin.AS_COPY === origin) {
          this.originDayDate.ref.enable();
        } else {
          this.originDayDate.setValue(null);
          this.originDayDate.ref.disable();
        }
      })
    ).subscribe(noop);
    this.originDayDate.ref.disable();
  }

  getValue(): DayOfEatingBeginFormValue {
    return {
      origin: this.origin.value,
      originDayDate: this.originDayDate.value
    };
  }

  setOriginDayDateValue(date: Date): void {
    this.originDayDate.setValue(date);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
