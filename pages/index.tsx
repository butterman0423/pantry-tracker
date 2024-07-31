import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useState, useEffect } from "react";
import { getStore } from "@/app/lib/firebase";
import { ItemStore } from "@/app/lib/store";

import Container from "@mui/material/Container";

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

export default function Home() {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        (async () => {
            const store = getStore();
            const itemStore = new ItemStore(store, '-1');
            console.log(await itemStore.getItems());
        })()
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <main>
                <Container>
                    <h1>Hello World</h1>
                    <p>Sample Text</p>
                </Container>
            </main>
        </ThemeProvider>
    );
}