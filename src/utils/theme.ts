import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: red[800],
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#795548",
    },
    background: {
      default: "#242526",
    },
    mode: "dark",
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          "html, body, body>div": {
            height: "100%",
          },
        },
      },
    },
  },
});

export default theme;
