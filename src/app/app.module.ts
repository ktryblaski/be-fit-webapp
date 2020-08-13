import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MenuComponent } from './menu/menu.component';
import { MainAreaComponent } from './main-area/main-area.component';
import { MatListModule } from "@angular/material/list";
import { HttpClientModule } from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {NotificationModule} from "./shared/component/notification/notification.module";
import {ResponsiveModule} from "./shared/directive/responsive/responsive.module";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    ReactiveFormsModule,
    NotificationModule,
    ResponsiveModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    MainAreaComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
