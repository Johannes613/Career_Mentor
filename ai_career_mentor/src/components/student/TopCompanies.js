import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

const companies = [
  { name: 'Google', field: 'Software Engineering', logo: 'G' },
  { name: 'Emaar', field: 'Real Estate', logo: 'E' },
  { name: 'Mubadala', field: 'Investment', logo: 'M' },
  { name: 'Etisalat', field: 'Artificial Intelligence', logo: 'E&' },
];

const TopCompanies = () => (
  <Card sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
    <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>Top Companies Hiring</Typography>
      
      <List sx={{ flexGrow: 1 }}>
        {companies.map(company => (
          <ListItem key={company.name} disablePadding>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                {company.logo}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={company.name} secondary={company.field} />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default TopCompanies;