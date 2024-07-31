import type { ItemFields, ItemFieldsOpt } from '@/app/lib/store';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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

export default function EditPage() {
    const store = getStore();
    const itemStore = new ItemStore(store, '-1');

    const router = useRouter();
    const params = useParams();
    if(!params)
        throw Error('Missing pid.');

    const [prevData, setPrevData] = useState<ItemFieldsOpt | ItemFields>({});
    const pid = params['pid'] as string;

    useEffect(() => {
        (async () => {
            const item = await itemStore.getItem(pid);
            if(!item)
                throw Error(`Unable to find product: ${pid}`);

            setPrevData(item)
        })()
    })

    async function onSubmit(dat: ItemFieldsOpt) {
        await itemStore.updateItem(pid, {...prevData, ...dat});
        router.push('/');
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <main>
                <Container>
                    <h1>Edit Item</h1>
                    <ItemForm fields={prevData as ItemFields} onSubmit={onSubmit}/>
                </Container>
            </main>
        </ThemeProvider>
    );
}