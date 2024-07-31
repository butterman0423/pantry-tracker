"use client"

import type { ItemFieldsOpt } from '@/app/lib/store';

import { useRouter } from 'next/navigation';
import { getStore } from "@/app/lib/firebase";
import { ItemStore } from "@/app/lib/store";

import Container from "@mui/material/Container";
import ItemForm from '@/app/components/ItemForm';

export default function AddPage() {
    const store = getStore();
    const itemStore = new ItemStore(store, '-1');

    const router = useRouter();

    async function onSubmit(dat: ItemFieldsOpt) {
        await itemStore.createItem(dat);
        router.push('/');
    }

    return (
        <main>
            <Container>
                <h1>Add New Item</h1>
                <ItemForm onSubmit={onSubmit}/>
            </Container>
        </main>
    );
}