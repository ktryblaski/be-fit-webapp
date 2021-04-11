import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorModalModule } from './shared/component/error-modal/error-modal.module';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { HttpsParamsEncoderInterceptor } from './shared/service/interceptor/https-params-encoder.interceptor';
import {NotificationModule} from './shared/component/notification/notification.module';
import {PublicModule} from './public/public.module';
import {AuthService} from './shared/service/auth.service';

export function appInitializer(authService: AuthService) {
  return () => {
    return authService.checkAuthentication().toPromise();
  };
}

@NgModule({
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    PublicModule,

    ErrorModalModule,
    NotificationModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsParamsEncoderInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [AuthService],
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
