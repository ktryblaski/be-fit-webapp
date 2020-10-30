import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayOfEatingBeginDialogComponent } from './day-of-eating-begin-dialog.component';
import { DayOfEatingBeginFormModule } from './day-of-eating-begin-form/day-of-eating-begin-form.module';
import { SpinnerModule } from '../../../shared/component/spinner/spinner.module';
import { HelperModule } from '../../../shared/helper/helper.module';

@NgModule({
  imports: [CommonModule, DayOfEatingBeginFormModule, SpinnerModule, HelperModule],
  declarations: [DayOfEatingBeginDialogComponent],
})
export class DayOfEatingBeginDialogModule {}
