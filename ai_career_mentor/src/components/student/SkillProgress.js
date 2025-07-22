import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, useTheme } from '@mui/material';
import { MoreVertical } from 'lucide-react';

const skills = [
  { name: 'User Experience Design', progress: 72 },
  { name: 'Basic fundamentals', progress: 48 },
  { name: 'React Native components', progress: 15 },
  { name: 'Basic of music theory', progress: 24 },
];

const barColors = ['primary', 'primary', 'primary', 'primary'];

const SkillProgress = (props) => {
  const theme = useTheme();

  return (
    <Card 
      elevation={0}
      sx={{ 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
        ...props.sx 
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">Skill Development</Typography>
          <MoreVertical size={20} cursor="pointer" color={theme.palette.text.secondary} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {skills.map((skill, index) => (
            <Box key={skill.name}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body1" fontWeight="medium">{skill.name}</Typography>
                <Typography variant="body1" color="text.secondary">{skill.progress}%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={skill.progress}
                color={barColors[index % barColors.length]}
                sx={{
                  height: 8,
                  borderRadius: theme.shape.borderRadius,
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SkillProgress;