import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SecuredComponent} from './secured.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MainAreaComponent} from './main-area/main-area.component';
import {SecuredRoutingModule} from './secured-routing.module';
import {MenuComponent} from './menu/menu.component';
import {SpinnerModule} from '../shared/component/spinner/spinner.module';
import {MatListModule} from '@angular/material/list';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    SecuredRoutingModule,

    MatSidenavModule,
    SpinnerModule,
    MatListModule,
    FontAwesomeModule
  ],
  declarations: [
    MainAreaComponent,
    MenuComponent,
    SecuredComponent
  ]
})
export class SecuredModule { }
