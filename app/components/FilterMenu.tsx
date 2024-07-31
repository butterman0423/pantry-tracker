import type { SelectChangeEvent } from '@mui/material/Select';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

type Options = {
    vals: string[],
    onSelect: (filts: string[]) => void
}

export default function FilterMenu({
    vals, onSelect
}: Options) {
    const [selected, setSelected] = useState<string[]>([]);

    const onChange = (e: SelectChangeEvent<typeof selected>) => {
        const {
            target: { value }
        } = e;

        setSelected(typeof value === 'string' ? value.split(',') : value)
        onSelect(typeof value === 'string' ? value.split(',') : value)
    }

    return (
        <Stack direction='row'>
            <p>Filter By: </p>
            <Select 
                multiple 
                value={selected}
                onChange={onChange}
            >
                { vals.map((n, idx) => (
                    <MenuItem key={idx} value={n}>{n}</MenuItem>
                )) }
            </Select>
        </Stack>
    );
}