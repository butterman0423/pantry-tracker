import type { SelectChangeEvent } from '@mui/material/Select';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

type Options = {
    vals: string[],
    onSelect: (filt: string) => void
}

export default function FilterMenu({
    vals, onSelect
}: Options) {
    const [selected, setSelected] = useState<string>('');

    const onChange = (e: SelectChangeEvent<typeof selected>) => {
        const {
            target: { value }
        } = e;

        setSelected(value)
        onSelect(value)
    }

    return (
        <Stack direction='row'>
            <p>Filter By: </p>
            <Select  
                value={selected}
                onChange={onChange}
            >
                <MenuItem value=''>
                    <em>None</em>
                </MenuItem>
                { vals.map((n, idx) => (
                    <MenuItem key={idx} value={n}>{n}</MenuItem>
                )) }
            </Select>
        </Stack>
    );
}