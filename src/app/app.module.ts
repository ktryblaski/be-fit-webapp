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
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatListModule } from "@angular/material/list";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    MainAreaComponent,
    ToolbarComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
