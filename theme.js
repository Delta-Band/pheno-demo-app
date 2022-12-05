import { createTheme } from '@mui/material/styles';

const themeWithCustomBreakpoints = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 940
    }
  }
});

const theme = createTheme(themeWithCustomBreakpoints, {
  palette: {
    primary: {
      main: '#21336c'
    }
  },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    body1: {
      fontSize: 14,
      [themeWithCustomBreakpoints.breakpoints.up('tablet')]: {
        fontSize: 16
      }
    },
    subtitle1: {
      fontSize: 14.5
    }
  },
  shadows: {
    input: '-2px -2px 6px rgb(0 0 0 / 20%), -2px -2px 18px rgb(0 0 0 / 20%)'
  }
});

export default theme;
