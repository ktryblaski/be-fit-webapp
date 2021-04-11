import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterFormComponent} from './register-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {HelperModule} from '../../../shared/helper/helper.module';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    HelperModule
  ],
  exports: [
    RegisterFormComponent
  ],
  declarations: [
    RegisterFormComponent
  ]
})
export class RegisterFormModule { }
