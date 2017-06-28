/*
 * Copyright (c) 2017 AXA Group Solutions.
 *
 * Licensed under the AXA Group Solutions License (the "License"); you
 * may not use this file except in compliance with the License.
 * A copy of the License can be found in the LICENSE.TXT file distributed
 * together with this file.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppSettings } from '../../app.settings';

@Injectable()
export class AuthService {
  constructor(
    private http: Http,
  ) { }

  public login(email: string, password: string): Observable<any> {
    const body = {
      email,
      password,
    };
    const headers = {
      headers: AppSettings.DEFAULT_HEADERS,
    };

    return this.http
      .post(`{$AppSettings.API_ROOT}/oauth2/token`, body, headers)
      .map((response: Response) => {
        const resp = response.json();
        sessionStorage.setItem('access_token', resp.access_token);

        return resp;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any): Observable<any> {
    return Observable.throw(error.json().error);
  }
}
