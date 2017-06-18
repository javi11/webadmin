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

@Injectable()
export class GnomeService {
  private gnomeEndpoint = 'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json';
  constructor(
    private http: Http,
  ) { }

  loadAllGnomes(): Observable<{}[]> {
    return this.http.get(this.gnomeEndpoint)
      .map((res:Response) => res.json().Brastlewark);
  }
}
