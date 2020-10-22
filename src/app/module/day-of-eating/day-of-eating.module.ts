import { NgModule } from '@angular/core';
import { DayOfEatingBeginDialogModule } from './day-of-eating-begin-dialog/day-of-eating-begin-dialog.module';
import { DayOfEatingDetailsModule } from './day-of-eating-details/day-of-eating-details.module';
import { DayOfEatingEditModule } from './day-of-eating-edit/day-of-eating-edit.module';
import { DayOfEatingListModule } from './day-of-eating-list/day-of-eating-list.module';

@NgModule({
  imports: [
    DayOfEatingBeginDialogModule,
    DayOfEatingDetailsModule,
    DayOfEatingEditModule,
    DayOfEatingListModule
  ]
})
export class DayOfEatingModule { }
