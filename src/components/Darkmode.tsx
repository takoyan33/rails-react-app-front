import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";
import "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";


export default function Darkmode() {
  const [darkMode, setDarkMode] = React.useState(
    localStorage.getItem("darkMode") === "on" ? true : false
  );
  const handleDarkModeOn = () => {
    localStorage.setItem("darkMode", "on");
    setDarkMode(true);
  };
  const handleDarkModeOff = () => {
    localStorage.setItem("darkMode", "off");
    setDarkMode(false);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: colors.blue[800],
      },
      type: darkMode ? "dark" : "light",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <div>
          <CssBaseline />
          {darkMode ? (
            <IconButton color="inherit" onClick={handleDarkModeOff}>
              <Brightness7Icon />
              <p>ホワイトモードに切り替える</p>
            </IconButton>
          ) : (
            <IconButton color="inherit" onClick={handleDarkModeOn}>
              <Brightness4Icon />
              <p>ダークモードに切り替える</p>
            </IconButton>
          )}
        </div>
      </ThemeProvider>
    </>
  );
}
