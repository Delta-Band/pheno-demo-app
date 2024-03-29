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
      main: '#0000ff'
    }
  },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontFamily: 'Roboto Mono',
    body1: {
      fontSize: 14,
      fontFamily: 'Roboto Mono',
      lineHeight: '1.75rem',
      [themeWithCustomBreakpoints.breakpoints.up('tablet')]: {
        lineHeight: '2rem',
        fontSize: 14
      },
      marginBlock: 0
    },
    subtitle1: {
      fontFamily: 'Roboto Mono',
      lineHeight: 1.5,
      fontSize: 13
    },
    h1: {
      fontFamily: 'Roboto Mono',
      fontSize: 32,
      fontWeight: 600,
      marginTop: 0,
      marginBottom: '3vh'
    },
    h2: {
      fontFamily: 'Roboto Mono',
      fontSize: 16,
      fontWeight: 600,
      marginTop: '3.4vh',
      marginBottom: '1.75vh',
      [themeWithCustomBreakpoints.breakpoints.up('tablet')]: {
        fontSize: 18,
        fontWeight: 300
      }
    },
    h4: {
      fontSize: 16,
      fontWeight: 600,
      fontFamily: 'Roboto Mono'
    },
    h5: {
      fontFamily: 'Roboto Mono',
      marginTop: 0,
      marginBottom: '0.75rem'
    }
  },
  shadows: {
    input: '-2px -2px 6px rgb(0 0 0 / 20%), -2px -2px 18px rgb(0 0 0 / 20%)',
    1: '0 2px 8px 1px rgb(0 0 0 / 49%)',
    8: '0 2px 8px 1px rgb(0 0 0 / 49%)'
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          paddingBlock: 11.5
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: 'translate(14px, 12px) scale(1)'
        },
        shrink: {
          transform: 'translate(14px, -9px) scale(0.75)'
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          paddingBlock: 0
        },
        paper: {
          marginTop: 4
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          paddingInline: 8,
          gap: 8
        }
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          border: '2px solid #0000ff'
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    }
  }
});

export default theme;
