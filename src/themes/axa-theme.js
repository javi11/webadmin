import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors';

export const axaTheme = () => {
  let overwrites = {
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
