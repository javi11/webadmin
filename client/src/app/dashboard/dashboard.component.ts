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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent {
  private name: string = 'Angular';
  private language: string;

  constructor(
    private router: Router,
    private translate: TranslateService,
    public authHttp: AuthHttp,
  ) {
    // init the value
    this.language = translate.currentLang;
  }

  public onNavigate(): void {
    this.router.navigate(['/goodbye']);
  }

  public onChangeLanguage(): void {
    this.translate.use(this.language);
  }

}
