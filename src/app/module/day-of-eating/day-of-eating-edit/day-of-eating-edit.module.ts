import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayOfEatingEditComponent } from './day-of-eating-edit.component';
import { DayOfEatingFormModule } from '../day-of-eating-form/day-of-eating-form.module';
import { SpinnerModule } from '../../../shared/component/spinner/spinner.module';

@NgModule({
  imports: [CommonModule, DayOfEatingFormModule, SpinnerModule],
  declarations: [DayOfEatingEditComponent],
})
export class DayOfEatingEditModule {}
