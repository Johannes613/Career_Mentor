import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';

const AnalysisHistoryTable = ({ history }) => {
    return (
        <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="analysis history table">
                <TableHead>
                    <TableRow>
                        <TableCell>File Name</TableCell>
                        <TableCell align="center">Score</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
    );
};

export default AnalysisHistoryTable;