import { NgModule } from '@angular/core';
import { DayOfEatingDetailsModule } from './day-of-eating-details/day-of-eating-details.module';
import { DayOfEatingEditModule } from './day-of-eating-edit/day-of-eating-edit.module';
import { DayOfEatingListModule } from './day-of-eating-list/day-of-eating-list.module';
import { DayOfEatingRoutingModule } from './day-of-eating-routing.module';

@NgModule({
  imports: [DayOfEatingRoutingModule, DayOfEatingDetailsModule, DayOfEatingEditModule, DayOfEatingListModule],
})
export class DayOfEatingModule {}
