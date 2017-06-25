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

@Component({
  selector: 'axa-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class FooterComponent {
  private language: string;
  private selectedOption: number;

  constructor(
    private translate: TranslateService,
  ) {
    // init the value
    this.language = translate.currentLang;
  }

  public toggleShow(option: number) {
    if (this.selectedOption === option) {
      this.selectedOption = 0;
    } else {
      this.selectedOption = option;
    }
  }

  public changueLanguague(language: string): void {
    this.language = language;
    this.translate.use(this.language);
  }


}
