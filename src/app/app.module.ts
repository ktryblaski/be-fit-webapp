import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuComponent } from './menu/menu.component';
import { MainAreaComponent } from './main-area/main-area.component';
import { MatListModule } from '@angular/material/list';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationModule } from './shared/component/notification/notification.module';
import { ResponsiveModule } from './shared/directive/responsive/responsive.module';
import { ErrorModalModule } from './shared/component/error-modal/error-modal.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { HttpsParamsEncoderInterceptor } from './shared/service/interceptor/https-params-encoder.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    FontAwesomeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,

    ResponsiveModule,
    NotificationModule,
    ErrorModalModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    MainAreaComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsParamsEncoderInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
