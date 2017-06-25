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
import { TranslateService } from '@ngx-translate/core';

import '../../../node_modules/font-awesome/css/font-awesome.css';
import '../../../node_modules/@axa/web-toolkit/dist/bundles/all.css';
import './app.scss';

@Component({
  selector: 'my-app',
  templateUrl: './app.html',
})
export class AppComponent {
  constructor(translate: TranslateService) {
    const browserLang = translate.getBrowserLang();

    // Add any language code available in the i18n folder here
    const availableLangs = ['en', 'es'];
    translate.addLangs(availableLangs);

    // this language will be used as a fallback
    // when a translation isn't found in the current language
    translate.setDefaultLang('en');

    translate.use(browserLang);
  }
}
