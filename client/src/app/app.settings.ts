import { Headers } from '@angular/http';

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');

export class AppSettings {
  public static APP_NAME = 'AMF BACKEND';
  public static DEFAULT_HEADERS = contentHeaders;
  public static API_ROOT = '/v1/api';
}
