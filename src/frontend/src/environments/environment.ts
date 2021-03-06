// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urls : {
    registration: 'http://192.168.0.107:2802/api/v1/tenants/',
    authentication: 'http://192.168.0.107:2802/api/v1/auths/',
    tenants: 'http://192.168.0.107:2802/api/v1/tenants',
    prices: 'http://192.168.0.107:2802/api/v1/prices/'
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
