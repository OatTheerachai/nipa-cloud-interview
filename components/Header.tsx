'use client';
import { Stack, Typography, Button } from "@mui/material";
import React from "react";
// icons
import AddIcon from '@mui/icons-material/Add';

interface HeaderProps {
    title: string;
    openModal: () => void
}

const Header: React.FC<HeaderProps> = ({ title, openModal }) => {
    return (
        <Stack flexDirection={"row"} alignItems={"center"} justifyContent={'space-between'}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{title}</Typography>
            <Button onClick={() => openModal()} size="small" startIcon={<AddIcon />} variant="contained">Add Ticket</Button>
        </Stack>
    )
}

export default Header;
