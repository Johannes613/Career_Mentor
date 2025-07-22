import React from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const GenerationHistory = ({ history }) => {
    return (
        <>
            <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
                Generation History
            </Typography>
            <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 650 }} aria-label="generation history table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Role</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Date Generated</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.role}</TableCell>
                                <TableCell>{row.company}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" size="small">View</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default GenerationHistory;