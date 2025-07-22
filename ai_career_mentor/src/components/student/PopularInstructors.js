import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, IconButton } from '@mui/material';
import { MoreVertical } from 'lucide-react';

const instructors = [
  { name: 'Jordan Stevenson', field: 'Business Intelligence', courses: 33, avatar: 'J' },
  { name: 'Bentlee Emblin', field: 'Digital Marketing', courses: 52, avatar: 'B' },
  { name: 'Benedetto Rossiter', field: 'UI/UX Design', courses: 12, avatar: 'B' },
  { name: 'Beverlie Krabbe', field: 'Vue', courses: 8, avatar: 'B' },
];

const PopularInstructors = () => (
  <Card sx={{ height: '100%', border: '1px solid #e0e0e0', borderRadius: 4, boxShadow: 'none' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" fontWeight="bold">Popular Instructors</Typography>
        <IconButton size="small"><MoreVertical size={20} /></IconButton>
      </Box>
       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" color="text.secondary">INSTRUCTORS</Typography>
        <Typography variant="body2" color="text.secondary">COURSES</Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {instructors.map(inst => (
          <ListItem key={inst.name} disablePadding sx={{ mb: 2 }}>
            <ListItemAvatar>
              <Avatar>{inst.avatar}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={inst.name} secondary={inst.field} />
            <Typography variant="body1" fontWeight="medium">{inst.courses}</Typography>
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default PopularInstructors;