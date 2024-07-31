'use client'

import { getStore } from "@/app/lib/firebase";
import { ItemStore } from "@/app/lib/store";
import { useRouter, usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import type { ItemFields } from "../lib/store"
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from '@mui/material/Button';

type Options = {
    details: ItemFields,
    items: ItemFields[],
    setItems: React.Dispatch<React.SetStateAction<ItemFields[]>>
}

export default function Item({ 
    details, items, setItems
}: Options) {
    const { pid, name, category, quantity } = details;
    const router = useRouter();
    const path = usePathname();

    function editItem() {
        router.push(`${path}/-1/modify/${pid}`);
    }

    async function deleteItem() {
        const store = getStore();
        const itemStore = new ItemStore(store, '-1');
        
        await itemStore.deleteItem(pid);
        setItems(items.filter(({ pid: tid }) => pid !== tid));
    }

    return (
        <Box>
            <Box>{ name }</Box>
            <Box>{ category }</Box>
            <Box>{ quantity }</Box>
            <ButtonGroup>
                <Button onClick={editItem}>Edit</Button>
                <Button onClick={deleteItem}>Delete</Button>
            </ButtonGroup>
        </Box>
    );
}