import { createTheme } from '@mui/material'

// To add custom variables to theme with TS
// https://material-ui.com/guides/typescript/#customization-of-theme
const customTheme = {
  palette: {
    primary: {
      main: '#6c6753',
    },
    secondary: {
      main: '#ffcc00',
    }
  },
  spacing: (factor: number) => `${0.5 * factor}rem`
}

const theme = createTheme(customTheme)

export default theme
