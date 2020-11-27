import { DayOfEatingBeginOrigin } from '../../../../../shared/model/dto/day-of-eating-begin-dto';
import { TypedFormControl } from '../../../../../shared/form/typed-form/typed-form';

export interface DayOfEatingBeginForm {
  origin: DayOfEatingBeginOrigin;
  originDayDate: Date;
}

export interface DayOfEatingBeginFormControls {
  origin: TypedFormControl<DayOfEatingBeginOrigin>;
  originDayDate: TypedFormControl<object>;
}
