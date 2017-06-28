import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(
    new AuthConfig({
      tokenName: 'token',
      tokenGetter: (() => sessionStorage.getItem('access_token')),
      globalHeaders: [
        { 'Content-Type': 'application/json' },
        { Accept: 'application/json' },
      ],
    }),
    http,
    options,
  );
}
