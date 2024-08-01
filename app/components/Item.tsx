'use client'

import { getStore } from "@/app/lib/firebase";
import { ItemStore } from "@/app/lib/store";
import { useRouter, usePathname } from "next/navigation";

import { formatDate } from "../lib/date-converter";

import Box from "@mui/material/Box";
import type { ItemFields } from "../lib/store"
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";

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
        <Box>
            { header } : { value }
        </Box>
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
        <Box sx={{
            bgcolor: 'darkslategrey',
            borderRadius: '16px',
            overflow: 'clip',
            minWidth: '25%'
            //flexBasis: '25%'
        }}>
            <Box sx={{ 
                bgcolor: 'darkblue',
                textAlign: 'center',
                fontSize: 'h6.fontSize',
            }}>
                { name }
            </Box>

            <Stack direction='column' sx={{ lineHeight: 2, mx: '15px' }}>
                <DetailSlot header="Category" value={category}/>
                <DetailSlot header="Amount" value={quantity}/>
                <DetailSlot header="Date Updated" value={formatDate(date_mod)}/>
            </Stack>

            <ButtonGroup variant="contained" sx={{ width: '100%', justifyContent: 'center', my: '10px', boxShadow: 0 }}>
                <Button onClick={editItem}>Edit</Button>
                <Button onClick={deleteItem}>Delete</Button>
            </ButtonGroup>
        </Box>
    );
}