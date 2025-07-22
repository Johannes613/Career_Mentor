import React from 'react';
import { Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

const AnalysisHistoryTable = ({ history }) => {
    const theme = useTheme();

    return (
        // The entire component is now wrapped in a Card for a professional look
        <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <CardContent>
                <TableContainer component={Paper} elevation={0}>
                    <Table sx={{ minWidth: 650 }} aria-label="analysis history table">
                        {/* The TableHead is now styled with a background and bold text */}
                        <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>File Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Score</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ 
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.fileName}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip label={`${row.score}%`} color={row.score > 85 ? "success" : "warning"} />
                                    </TableCell>
                                    <TableCell align="center">{row.status}</TableCell>
                                    <TableCell align="center">{row.date}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" size="small">View Report</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default AnalysisHistoryTable;