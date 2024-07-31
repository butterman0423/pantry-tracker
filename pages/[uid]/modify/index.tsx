import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from "@mui/material/Container";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

export default function AddPage() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <main>
                <Container>
                    <h1>Add New Item</h1>
                    
                </Container>
            </main>
        </ThemeProvider>
    );
}