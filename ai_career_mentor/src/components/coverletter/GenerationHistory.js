import React from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Card, CardContent, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ArrowRight } from 'lucide-react';

const GenerationHistory = ({ history }) => {
    const theme = useTheme();

    return (
        <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <CardContent>
                
                <TableContainer component={Paper} elevation={0}>
                    <Table sx={{ minWidth: 650 }} aria-label="generation history table">
                        <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Date Generated</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', pr: 5 }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.map((row) => (
                                <TableRow 
                                    key={row.id} 
                                    sx={{ 
                                        '&:last-child td, &:last-child th': { border: 0 }
                                    }}
                                >
                                    <TableCell component="th" scope="row">{row.role}</TableCell>
                                    <TableCell>{row.company}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    {/* --- FIX: Added padding-right to align the button with the header --- */}
                                    <TableCell align="right" sx={{ pr: 3 }}>
                                        <Button 
                                            variant="outlined" 
                                            color="secondary"
                                            endIcon={<ArrowRight size={16} />}
                                        >
                                            View
                                        </Button>
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

export default GenerationHistory;