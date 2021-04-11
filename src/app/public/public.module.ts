import { NgModule } from '@angular/core';
import {AccountRecoveryModule} from './account-recovery/account-recovery.module';
import {LoginModule} from './login/login.module';
import {RegisterModule} from './register/register.module';
import {AccountRecoveryComponent} from './account-recovery/account-recovery.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

@NgModule({
  imports: [
    AccountRecoveryModule,
    LoginModule,
    RegisterModule
  ],
  exports: [
    AccountRecoveryComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class PublicModule { }
