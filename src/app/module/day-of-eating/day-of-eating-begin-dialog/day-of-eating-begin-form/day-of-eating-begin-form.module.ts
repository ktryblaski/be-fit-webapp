import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayOfEatingBeginFormComponent } from './day-of-eating-begin-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToggleButtonModule } from '../../../../shared/form/form-control/toggle-button/toggle-button.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { IsCopyFormDateVisiblePipe } from './is-copy-form-date-visible.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { HelperModule } from '../../../../shared/helper/helper.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ToggleButtonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatDialogModule,
        HelperModule,
    ],
  declarations: [
    DayOfEatingBeginFormComponent,
    IsCopyFormDateVisiblePipe,
  ],
  providers: [
    MatDatepickerModule,
  ],
  exports: [
    DayOfEatingBeginFormComponent,
  ]
})
export class DayOfEatingBeginFormModule { }
