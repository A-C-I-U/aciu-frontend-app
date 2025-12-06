import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    primary: {
      main: '#00B686',
      light: '#E6F8F3',
      dark: '#008965',
    },
    secondary: {
      main: '#737373',
    },
    error: {
      main: '#FF5A5A',
      light: '#FBEBEA',
      dark: '#005B33',
    },
    background: {
      default: '#E5E5E5',
    },
    divider: '#B0E8D9',
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: '#00B686',
            color: '#fff',
            border: 'none',
          },
        },
        {
          props: { variant: 'text' },
          style: {
            backgroundColor: 'transparent',
            color: '#737373',
            border: '1px solid #E5E5E5',
          },
        },
      ],
    },
    MuiCheckbox: {
        styleOverrides: {
            root: {
                color: "#00B686",
                '&.Mui-checked': {
                    color: '#00B686'
                }
            }
        }
    }
}});
