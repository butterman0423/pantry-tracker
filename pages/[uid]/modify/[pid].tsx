import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from "@mui/material/Container";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

export default function EditPage() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <main>

            </main>
        </ThemeProvider>
    );
}