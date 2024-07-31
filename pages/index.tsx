import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useState, useEffect } from "react";
import { getStore } from "@/app/lib/firebase";
import { ItemStore } from "@/app/lib/store";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

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
                    <h1>Hello World</h1>
                    <p>Sample Text</p>

                    <Button onClick={async () => {
                        await itemStore.createItem({
                            name: `Item B`
                        });
                        
                        /*
                        if(newDat)
                            setItems([...items, newDat]);
                        */
                    }}>Add</Button>
                    <Button onClick={async () => {
                        const name = `Item P`;
                        await itemStore.updateItem(items[0].pid, { name });
                        //setItems([...items].map(d => ({...d, name})))
                    }}>Update</Button>
                    <Button onClick={async () => {
                        await itemStore.deleteItem(items[0].pid);
                        //setItems([...items].splice(0, 1));
                    }}>Delete</Button>

                    <Stack>
                        { items.map(({ pid, name }) => <div key={pid}>{ name }</div>) }
                    </Stack>
                </Container>
            </main>
        </ThemeProvider>
    );
}