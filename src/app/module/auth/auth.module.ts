import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, AuthRoutingModule],
  declarations: [LoginComponent],
})
export class AuthModule {}
