'use client';
import React from "react";
import { Box, Typography } from "@mui/material";

// define a mapping of status to colors
const statusColors: { [key: string]: string } = {
    pending: '#00796b',
    accepted: '#388e3c',
    resolved: '#0288d1',
    rejected: '#d32f2f',
};

interface SectionHeaderProps {
    status: string;
    name: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ status, name }) => {
    // Get color based on status
    const bgcolor = statusColors[status] || '#00796b'; // Default to a fallback color

    return (
        <Box sx={{ bgcolor, borderRadius: '8px', px: 2, py: 1, mb: 2 }}>
            <Typography sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                {name}
            </Typography>
        </Box>
    );
};

export default SectionHeader;
