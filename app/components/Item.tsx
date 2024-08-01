'use client'

import type { ItemFields } from "../lib/store"

import { getStore } from "@/app/lib/firebase";
import { ItemStore } from "@/app/lib/store";
import { useRouter, usePathname } from "next/navigation";

import { formatDate } from "../lib/date-converter";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from "@mui/material/CardHeader";

type Options = {
    details: ItemFields,
    items: ItemFields[],
    setItems: React.Dispatch<React.SetStateAction<ItemFields[]>>
}

type DetailSlotOpts = {
    header: string,
    value: any
}

function DetailSlot({
    header, value
}: DetailSlotOpts) {
    return (
        <Typography variant='body1'>{ header } : { value }</Typography>
    )
}
export default function Item({ 
    details, items, setItems
}: Options) {
    const { pid, name, category, quantity, date_mod } = details;
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
        <Card sx={{ minWidth: '25%' }}>
            <Paper elevation={5} square>
                <CardHeader
                    title={ name }
                    subheader={ `Last Updated : ${formatDate(date_mod)}` }
                />
            </Paper>

            <CardContent sx={{ lineHeight: 2 }}>
                <DetailSlot header="Category" value={category}/>
                <DetailSlot header="Amount" value={quantity}/>

                <ButtonGroup variant="contained" sx={{ width: '100%', justifyContent: 'center', mt: '10px', boxShadow: 0 }}>
                    <Button onClick={editItem}>Edit</Button>
                    <Button onClick={deleteItem}>Delete</Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    );
}