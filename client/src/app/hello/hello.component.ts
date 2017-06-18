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

const logo = require('../../assets/img/images/angular.svg');
const icon = require('../../assets/img/icons/exclamation.svg');

@Component({
  selector: 'hello',
  templateUrl: './hello.html',
  styleUrls: ['./hello.scss'],
})
export class HelloComponent {
  private name: string = 'Angular';
  // Layer id is needed to use as <svg> but not for <img>. See difference in html
  private logo: SVGAElement = logo;
  private icon: string = `${icon}#Layer_1`;
  private language: string;

  constructor(
    private router: Router,
    private translate: TranslateService,
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
