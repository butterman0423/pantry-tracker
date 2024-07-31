'use client'

import { useRouter, usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import type { ItemFields } from "../lib/store"
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from '@mui/material/Button';

type Options = {
    details: ItemFields
}

export default function Item({ details }: Options) {
    const { pid, name, category, quantity } = details;
    const router = useRouter();
    const path = usePathname();

    function editItem() {
        router.push(`${path}/-1/modify/${pid}`);
    }

    return (
        <Box>
            <Box>{ name }</Box>
            <Box>{ category }</Box>
            <Box>{ quantity }</Box>
            <ButtonGroup>
                <Button onClick={editItem}>Edit</Button>
                <Button onClick={() => {}}>Delete</Button>
            </ButtonGroup>
        </Box>
    );
}