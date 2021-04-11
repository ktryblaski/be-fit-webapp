import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import {HelperModule} from '../../../shared/helper/helper.module';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    HelperModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginFormComponent
  ],
  exports: [
    LoginFormComponent
  ]
})
export class LoginFormModule { }
