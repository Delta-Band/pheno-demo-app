import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 14,
    subtitle1: {
      fontSize: 14.5
    }
  },
  shadows: {
    input: '-2px -2px 6px rgb(0 0 0 / 20%), -2px -2px 18px rgb(0 0 0 / 20%)'
  }
});

export default theme;
