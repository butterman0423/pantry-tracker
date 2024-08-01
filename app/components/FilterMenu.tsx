import type { SelectChangeEvent } from '@mui/material/Select';

import Box from '@mui/material/Box';
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
        <Box>
            <span>Filter By: </span>
            <Select  
                value={selected}
                onChange={onChange}
                sx={{
                    width: '100px',
                }}
            >
                <MenuItem value=''>
                    <em>None</em>
                </MenuItem>
                { vals.map((n, idx) => (
                    <MenuItem key={idx} value={n}>{n}</MenuItem>
                )) }
            </Select>
        </Box>
    );
}