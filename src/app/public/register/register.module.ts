import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import {RegisterFormModule} from './register-form/register-form.module';
import {SpinnerModule} from '../../shared/component/spinner/spinner.module';
import {AppRoutingModule} from '../../app-routing.module';
import {HelperModule} from '../../shared/helper/helper.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterFormModule,
    SpinnerModule,
    AppRoutingModule,
    HelperModule
  ],
  declarations: [
    RegisterComponent
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
