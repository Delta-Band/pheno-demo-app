import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 16
  }
});

export default theme;
