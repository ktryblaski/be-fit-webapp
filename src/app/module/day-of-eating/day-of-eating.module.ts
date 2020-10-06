import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayOfEatingListComponent } from './day-of-eating-list/day-of-eating-list.component';
import { DayOfEatingRoutingModule } from './day-of-eating-routing.module';
import { DayOfEatingListUiComponent } from './day-of-eating-list/day-of-eating-list-ui/day-of-eating-list-ui.component';
import { SpinnerModule } from '../../shared/component/spinner/spinner.module';
import { MatButtonModule } from '@angular/material/button';
import { HelperModule } from '../../shared/helper/helper.module';
import { NoTableDataModule } from '../../shared/component/no-table-data/no-table-data.module';
import { DayOfEatingDetailsComponent } from './day-of-eating-details/day-of-eating-details.component';
import { DayOfEatingEditComponent } from './day-of-eating-edit/day-of-eating-edit.component';
import { DayOfEatingDetailsUiComponent } from './day-of-eating-details/day-of-eating-details-ui/day-of-eating-details-ui.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DayOfEatingFormModule } from './day-of-eating-form/day-of-eating-form.module';
import { IsTodayPipe } from './day-of-eating-list/day-of-eating-list-ui/is-today.pipe';
import { CalculatorModule } from '../../shared/pipe/calculator/calculator.module';
import { MealViewModule } from '../../shared/component/meal/meal-view/meal-view.module';
import { AsyncDataContainerModule } from '../../shared/component/async-data-container/async-data-container.module';
import { DayOfEatingBeginDialogComponent } from './day-of-eating-begin-dialog/day-of-eating-begin-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DayOfEatingBeginFormModule } from './day-of-eating-begin-dialog/day-of-eating-begin-form/day-of-eating-begin-form.module';

@NgModule({
  imports: [
    CommonModule,
    DayOfEatingRoutingModule,
    SpinnerModule,
    MatButtonModule,
    HelperModule,
    NoTableDataModule,
    MatTabsModule,
    DayOfEatingFormModule,
    CalculatorModule,
    MealViewModule,
    AsyncDataContainerModule,
    MatDialogModule,
    DayOfEatingBeginFormModule,
  ],
  declarations: [
    DayOfEatingListComponent,
    DayOfEatingListUiComponent,
    DayOfEatingDetailsComponent,
    DayOfEatingEditComponent,
    DayOfEatingDetailsUiComponent,
    IsTodayPipe,
    DayOfEatingBeginDialogComponent,
  ],
})
export class DayOfEatingModule { }
