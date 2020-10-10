import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from './error-modal.component';
import { HelperModule } from '../helper/helper.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    HelperModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    ErrorModalComponent
  ],
  exports: [
    ErrorModalComponent
  ]
})
export class ErrorModalModule { }
