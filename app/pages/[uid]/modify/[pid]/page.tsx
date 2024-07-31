"use client"

import type { ItemFields, ItemFieldsOpt } from '@/app/lib/store';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getStore } from "@/app/lib/firebase";
import { ItemStore } from "@/app/lib/store";

import Container from "@mui/material/Container";
import ItemForm from '@/app/components/ItemForm';

export default function EditPage() {
    const itemStore = useMemo(() => {
        const store = getStore();
        return new ItemStore(store, '-1');
    }, [])

    const router = useRouter();
    const params = useParams();
    if(!params)
        throw Error('Missing pid.');

    const [prevData, setPrevData] = useState<ItemFieldsOpt | ItemFields>({});
    const pid = params['pid'] as string;

    // Runs twice on first load?
    useEffect(() => {
        (async () => {
            const item = await itemStore.getItem(pid);
            if(!item)
                throw Error(`Unable to find product: ${pid}`);
            console.log(item);
            setPrevData(item)
        })()
    }, [pid, itemStore])

    async function onSubmit(dat: ItemFieldsOpt) {
        await itemStore.updateItem(pid, {...prevData, ...dat});
        router.push('/');
    }

    return (
        <main>
            <Container>
                <h1>Edit Item</h1>
                <ItemForm fields={prevData as ItemFields} onSubmit={onSubmit}/>
            </Container>
        </main>
    );
}