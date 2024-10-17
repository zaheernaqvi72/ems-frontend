import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
      fontFamily: "Roboto",
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        standard: 300,
        complex: 375,
      },
      easing: {
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
      },
    },
    components: {
      MuiModal: {
        styleOverrides: {
          root: {
            transition: "opacity 0.3s ease-in-out",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              color: "blue",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            transition: "border-color 0.3s ease-in-out",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            overflow: "hidden",
          },
          html: {
            overflow: "hidden",
          },
        },
      },
    },
  });

export default theme;