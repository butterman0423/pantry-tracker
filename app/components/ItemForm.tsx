import type { ItemFieldsOpt } from '../lib/store';

import React, { ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type Options = {
    fields: ItemFieldsOpt,
    setFields: React.Dispatch<React.SetStateAction<ItemFieldsOpt>>
    onSubmit: (dat: ItemFieldsOpt) => void
}

//name
//category
//quantity

export default function ItemForm({
    fields: inputs, setFields: setInputs, onSubmit
}: Options) {
    function handleChange(field: string) {
        return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { target: { value } } = e;
            setInputs({...inputs, [field]: value});
        }
    }

    return (
        <Box
            component='form'
        >
            <Stack direction='row' justifyContent='center' gap='25px' flexWrap='wrap' sx={{ my: '15px' }}>
                <TextField label='Name' value={inputs.name} onChange={handleChange('name')}/>
                <TextField label='Category' value={inputs.category} onChange={handleChange('category')}/>
                <TextField label='Quantity' type='number' value={inputs.quantity} onChange={handleChange('quantity')}/>
            </Stack>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                <Button type='submit' variant='contained'
                    onClick={(e) => { 
                        e.preventDefault(); 
                        onSubmit(inputs);
                    }}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
}