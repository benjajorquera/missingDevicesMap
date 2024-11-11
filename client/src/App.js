import "./App.css";
import Devices from "./components/Devices";
import NavBar from "./components/NavBar";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yellow, amber } from "@mui/material/colors";

// Cambia la paleta de colores
const theme = createTheme({
  palette: {
    primary: yellow,
    secondary: amber,
  },
});

// Aquí se llaman a los componentes de la app
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar />
        <Box sx={{ flexGrow: 1 }}>
          <Devices />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
