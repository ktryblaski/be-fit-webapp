// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const issuer = 'https://dev-hi3shhyw.eu.auth0.com/';
const redirectUri = window.location.origin;

export const environment = {
  production: false,
  API_URL: 'http://localhost/api',
  auth: {
    clientId: 'tBI0eE6ptOwIuKBgcdj6ZOyjjcl8p8Di',
    issuer,
    logoutUrl: `${issuer}v2/logout?client_id={{client_id}}&returnTo=${encodeURIComponent(redirectUri)}`,
    redirectUri,
    responseType: 'code',
    showDebugInformation: true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
