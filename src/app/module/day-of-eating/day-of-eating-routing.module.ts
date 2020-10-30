import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayOfEatingListComponent } from './day-of-eating-list/day-of-eating-list.component';
import { DayOfEatingDetailsComponent } from './day-of-eating-details/day-of-eating-details.component';
import { DayOfEatingEditComponent } from './day-of-eating-edit/day-of-eating-edit.component';

const routes: Routes = [
  { path: '', component: DayOfEatingListComponent },
  { path: ':id', component: DayOfEatingDetailsComponent },
  { path: ':id/edit', component: DayOfEatingEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DayOfEatingRoutingModule {}
