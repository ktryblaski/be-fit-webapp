import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {LoginFormModule} from './login-form/login-form.module';
import {SpinnerModule} from '../../shared/component/spinner/spinner.module';
import {AppRoutingModule} from '../../app-routing.module';
import {HelperModule} from '../../shared/helper/helper.module';

@NgModule({
  imports: [
    CommonModule,
    LoginFormModule,
    SpinnerModule,
    AppRoutingModule,
    HelperModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
