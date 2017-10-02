/*
 * Copyright (c) 2017 AXA Group Solutions.
 *
 * Licensed under the AXA Group Solutions License (the "License")
 * you may not use this file except in compliance with the License.
 * A copy of the License can be found in the LICENSE.TXT file distributed
 * together with this file.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors';

const axaTheme = () => {
  const overwrites = {
    palette: {
      primary1Color: Colors.indigo500,
      primary2Color: Colors.blue700,
      primary3Color: Colors.grey400,
      accent1Color: Colors.redA200,
      pickerHeaderColor: Colors.indigo500
    }
  };
  return getMuiTheme(baseTheme, overwrites);
};

export default axaTheme;
