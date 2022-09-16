import { createTheme } from '@mui/system';
import IranSance from './Fonts/Iransanse.woff';

const iranSance = {
  fontFamily: 'IranSance',
  fontStyle: 'semi-bold',
  fontDisplay: 'swap',
  fontWeight: '600',
  src: `
   local('IranSance'),
   url(${IranSance}) format('woff')
 `
};

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: ['"Open Sans"', 'IranSance', 'Roboto'].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [iranSance],
      },
    }
  }
})

export default theme;