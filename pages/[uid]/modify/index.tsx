import type { ItemFieldsOpt } from '@/app/lib/store';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useRouter } from 'next/router';
import { getStore } from "@/app/lib/firebase";
import { ItemStore } from "@/app/lib/store";

import Container from "@mui/material/Container";
import ItemForm from '@/app/components/ItemForm';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

export default function AddPage() {
    const store = getStore();
    const itemStore = new ItemStore(store, '-1');

    const router = useRouter();

    async function onSubmit(dat: ItemFieldsOpt) {
        await itemStore.createItem(dat);
        router.push('/');
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <main>
                <Container>
                    <h1>Add New Item</h1>
                    <ItemForm onSubmit={onSubmit}/>
                </Container>
            </main>
        </ThemeProvider>
    );
}