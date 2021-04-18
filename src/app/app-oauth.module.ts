import {NgModule} from '@angular/core';
import {AuthConfig, OAuthModule, OAuthModuleConfig} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';


const oAuthModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: [environment.API_URL],
    sendAccessToken: true
  },
};

export const authConfig: AuthConfig = {
  issuer: environment.auth.issuer,

  redirectUri: environment.auth.redirectUri,

  clientId: environment.auth.clientId,

  responseType: environment.auth.responseType,

  logoutUrl: environment.auth.logoutUrl,

  scope: ['openid', 'profile', 'email', 'not_exist', 'api'].join(' '),

  showDebugInformation: environment.auth.showDebugInformation,

  customQueryParams: {
    audience: environment.API_URL
  }
};

@NgModule({
  imports: [
    OAuthModule.forRoot(oAuthModuleConfig)
  ],
  exports: [
    OAuthModule
  ]
})
export class AppOAuthModule { }
