import { createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import deepOrange from '@material-ui/core/colors/deepOrange';
import grey from '@material-ui/core/colors/grey';

//Theme for custom primary and secondary color.
export const theme = createMuiTheme({
  palette: {
    //Cyan
    primary: {
      light: '#D2FDFF',
      main: '#B4DFE5',
      dark: cyan[500],
      darker: cyan[800],
    },
    //deepOrange
    secondary: {
      light: '#FBE8A6',
      main: '#F4976C',
      medium: deepOrange[700],
      dark: deepOrange[800],
      darker: '#731212',
    },
    third: {
      light: grey[300],
      main: grey[400],
      medium: grey[600],
      dark: grey[800],
    },
    text: {
      primary: '#191919',
      secondary: grey[200],
    },
  },

  typography: {
    useNextVariants: true,
    fontSize: 16, //default : 14
    htmlFontSize: 16,
  },
});

// function withRoot(Component) {
//   function withRoot(props) {
//     //MuiThemeProvider passes the theme down the React tree with React context
//     return (
//       <MuiThemeProvider theme={theme}>
//         <CssBaseLine />
//         <Component {...props} />
//       </MuiThemeProvider>
//     );
//   }
//   return withRoot;
// }

// export default withRoot;
