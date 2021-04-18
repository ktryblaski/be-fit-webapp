import { TypedFormControl } from '../../../../../shared/form/typed-form/typed-form';
import { DayOfEatingBeginOrigin } from '../../-model/day-of-eating-begin-origin';

export interface DayOfEatingBeginForm {
  origin: DayOfEatingBeginOrigin;
  originDayDate: Date;
}

export interface DayOfEatingBeginFormControls {
  origin: TypedFormControl<DayOfEatingBeginOrigin>;
  originDayDate: TypedFormControl<object>;
}
