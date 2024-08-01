"use client"
import { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { getStore } from "@/app/lib/firebase";
import { ItemStore } from "@/app/lib/store";

import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import FilterMenu from '@/app/components/FilterMenu';

import type { ItemFields } from '@/app/lib/store';
import Item from "../components/Item";

export default function Home() {
    const [items, setItems] = useState<ItemFields[]>([]);
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        const store = getStore();
        const itemStore = new ItemStore(store, '-1');

        (async () => {
            setItems(await itemStore.getItems());
        })()
    }, []);

    async function onFilter(filt: string) {
        const store = getStore();
        const itemStore = new ItemStore(store, '-1');

        if(filt === '') {
            setItems(await itemStore.getItems());
            return;
        }
        setItems(await itemStore.getItemsByCategory(filt));
    }

    return (
        <main>
            <Container>
                <Typography variant="h1" gutterBottom className="text-center">Pantry Tracker</Typography>

                <Box sx={{ my: '20px' }}>
                    <Stack direction='row' justifyContent='flex-end' alignItems='stretch' gap='15px'>
                        <FilterMenu vals={['Food', 'Drink']} onSelect={onFilter}/>
                        <Button variant='contained' onClick={() => router.push(`${path}/-1/modify`)}>Add</Button>
                    </Stack>
                </Box>
                
                <Stack direction={'row'} flexWrap='wrap' justifyContent='center' gap='50px'>
                    { items.map((fields) => {
                        return (
                            <Item key={fields.pid}
                                details={fields}
                                items={items}
                                setItems={setItems}/>
                        )})
                    }
                </Stack>
            </Container>
        </main>
    );
}