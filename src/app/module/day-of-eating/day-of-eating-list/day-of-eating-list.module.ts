import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayOfEatingListComponent } from './day-of-eating-list.component';
import { DayOfEatingListUiComponent } from './day-of-eating-list-ui/day-of-eating-list-ui.component';
import { IsTodayPipe } from './day-of-eating-list-ui/is-today.pipe';
import { HelperModule } from '../../../shared/helper/helper.module';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from '../../../shared/component/spinner/spinner.module';
import { NoTableDataModule } from '../../../shared/component/no-table-data/no-table-data.module';
import { DayOfEatingBeginDialogModule } from '../day-of-eating-begin-dialog/day-of-eating-begin-dialog.module';


@NgModule({
  imports: [
    CommonModule,
    HelperModule,
    MatButtonModule,
    SpinnerModule,
    NoTableDataModule,
    DayOfEatingBeginDialogModule
  ],
  declarations: [
    DayOfEatingListComponent,
    DayOfEatingListUiComponent,
    IsTodayPipe
  ]
})
export class DayOfEatingListModule { }
