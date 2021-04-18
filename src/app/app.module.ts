import {BrowserModule} from '@angular/platform-browser';
import {ApplicationRef, DoBootstrap, Inject, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorModalModule} from './shared/component/error-modal/error-modal.module';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {NotificationModule} from './shared/component/notification/notification.module';
import {OAuthService} from 'angular-oauth2-oidc';
import {DOCUMENT} from '@angular/common';
import {UnauthorizedInterceptor} from './shared/service/interceptor/unauthorized.interceptor';
import {HttpsParamsEncoderInterceptor} from './shared/service/interceptor/https-params-encoder.interceptor';
import {AppOAuthModule, authConfig} from './app-oauth.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MainAreaComponent} from './main-area/main-area.component';
import {MenuComponent} from './menu/menu.component';
import {MatListModule} from '@angular/material/list';


@NgModule({
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    AppRoutingModule,
    AppOAuthModule,

    ErrorModalModule,
    NotificationModule,
    MatSidenavModule,
    MatListModule,
    FontAwesomeModule
  ],
  declarations: [
    AppComponent,
    MainAreaComponent,
    MenuComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsParamsEncoderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
  ],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule implements DoBootstrap {

  constructor(@Inject(DOCUMENT) private document: Document,
              private library: FaIconLibrary,
              private oAuthService: OAuthService) {

    library.addIconPacks(fas, far);
  }

  ngDoBootstrap(applicationRef: ApplicationRef): void {
    this.oAuthService.configure(authConfig);

    this.oAuthService.loadDiscoveryDocumentAndLogin({
      state: window.location.href
    }).then(logged => {
      if (!logged) {
        return;
      }

      if (this.oAuthService.state) {
        const url = decodeURIComponent(this.oAuthService.state);
        this.document.defaultView.location.replace(url);
      } else {
        applicationRef.bootstrap(AppComponent);
        console.log(this.oAuthService.getGrantedScopes());
      }
    }).catch(error => console.error(error));
  }

}
