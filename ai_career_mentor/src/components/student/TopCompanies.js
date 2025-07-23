import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, useTheme, ListItemButton, Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const companies = [
  { name: 'Google', field: 'Software Engineering', logo: 'G', website: 'https://careers.google.com/' },
  { name: 'Mubadala', field: 'Investment & Asset Management', logo: 'M', website: 'https://www.mubadala.com/en/careers' },
  { name: 'G42', field: 'Artificial Intelligence', logo: 'G42', website: 'https://g42.ai/en/careers' },
  { name: 'Etisalat by e&', field: 'Telecommunications', logo: 'e&', website: 'https://www.etisalat.ae/en/c/careers.html' },
];

const TopCompanies = () => {
  const theme = useTheme();

  return (
    <Card 
        elevation={0}
        sx={{ 
            width: '100%', 
            height: '100%', 
            border: `1px solid ${theme.palette.divider}`,
            transition: theme.transitions.create(['box-shadow', 'transform']),
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[4],
            }
        }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>Top Companies Hiring in the UAE</Typography>
        
        <List sx={{ flexGrow: 1, p: 0 }}>
          {companies.map((company) => (
            <ListItem 
                key={company.name} 
                disablePadding
            >
              <ListItemButton
                  component="a"
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ borderRadius: 2 }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                    {company.logo}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={company.name} secondary={company.field} />
                <ArrowForwardIosIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TopCompanies;