import type { ItemFields, ItemFieldsOpt } from '../lib/store';

import { ChangeEvent, useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type Options = {
    fields?: ItemFields,
    onSubmit: (dat: ItemFieldsOpt) => void
}

//name
//category
//quantity

export default function ItemForm({
    fields, onSubmit
}: Options) {
    const [inputs, setInputs] = useState<ItemFieldsOpt>(fields ? fields : {});
    
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) {
        const { target: { value } } = e;
        return () => {
            setInputs({...fields, [field]: value});
        }
    }

    return (
        <Box
            component='form'
        >
            <TextField label='Name' value={inputs.name} onChange={(e) => handleChange(e, 'name')}/>
            <TextField label='Category' value={inputs.category} onChange={(e) => handleChange(e, 'category')}/>
            <TextField label='Quantity' type='number' value={inputs.quantity} onChange={(e) => handleChange(e, 'quantity')}/>
            <Button type='submit' 
                onClick={(e) => { 
                    e.preventDefault(); 
                    onSubmit(inputs);
                }}
            >
                Submit
            </Button>
        </Box>
    );
}