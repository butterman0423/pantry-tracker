"use client"
import { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { getStore } from "@/app/lib/firebase";
import { ItemStore } from "@/app/lib/store";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from "@mui/material/Stack";

import FilterMenu from '@/app/components/FilterMenu';

import type { ItemFields } from '@/app/lib/store';

export default function Home() {
    const [items, setItems] = useState<ItemFields[]>([]);
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        const store = getStore();
        const itemStore = new ItemStore(store, '-1');

        (async () => {
            console.log("Ran")
            setItems(await itemStore.getItems());
        })()
    }, []);

    return (
        <main>
            <Container>
                <h1>Pantry Tracker</h1>

                <Stack direction='row' justifyContent='flex-end' alignItems="center">
                    <FilterMenu vals={['A', 'B']} onSelect={() => {}}/>
                    <Button onClick={() => router.push(`${path}/-1/modify`)}>Add</Button>
                </Stack>

                <Stack>
                    { items.map(({ pid, name }) => <div key={pid}>{ name }</div>) }
                </Stack>
            </Container>
        </main>
    );
}