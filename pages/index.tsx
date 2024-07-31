import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useState, useEffect } from "react";
import { getStore } from "@/app/lib/firebase";
import { ItemStore } from "@/app/lib/store";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from "@mui/material/Stack";

import FilterMenu from '@/app/components/FilterMenu';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

import type { ItemFields } from '@/app/lib/store';

export default function Home() {
    const store = getStore();
    const itemStore = new ItemStore(store, '-1');
    
    const [items, setItems] = useState<ItemFields[]>([]);
    
    useEffect(() => {
        (async () => {
            setItems(await itemStore.getItems());
        })()
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <main>
                <Container>
                    <h1>Pantry Tracker</h1>

                    <Stack direction='row' justifyContent='space-evenly' alignItems="center">
                        <FilterMenu vals={['A', 'B']} onSelect={() => {}}/>
                        <ButtonGroup>
                            <Button>Add</Button>
                            <Button>Edit</Button>
                            <Button>Delete</Button>
                        </ButtonGroup>
                    </Stack>

                    <Stack>
                        { items.map(({ pid, name }) => <div key={pid}>{ name }</div>) }
                    </Stack>
                </Container>
            </main>
        </ThemeProvider>
    );
}