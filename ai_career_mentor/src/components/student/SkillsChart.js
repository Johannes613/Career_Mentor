import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const COLORS = ['#60A5FA', '#2DD4BF', '#4ADE80', '#A78BFA', '#F87171', '#FDBA8C'];

const SkillsChart = ({ data = [] }) => {
    const chartData = data.map((item, index) => ({ ...item, yValue: data.length - index }));
    const legendData = [...chartData].reverse();

    return (
      <Card
        elevation={0}
        sx={{
          border: '1px solid #e0e0e0',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Topics You Are Interested In
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, height: '100%' }}>
            <Box sx={{ flex: 1, minHeight: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                >
                  <XAxis type="number" domain={[0, 40]} tickFormatter={(tick) => `${tick}%`} stroke="#a0a0a0" fontSize={12} />
                  <YAxis type="number" dataKey="yValue" tickLine={false} axisLine={false} tick={false} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" barSize={30} radius={[4, 4, 4, 4]}>
                    <LabelList dataKey="name" position="insideLeft" offset={10} style={{ fill: 'white', fontWeight: 'bold' }} />
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <Box sx={{ width: '35%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
              {legendData.map((entry, index) => (
                <Box key={`legend-${index}`} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: COLORS[index % COLORS.length] }} />
                  <Typography variant="body2">{entry.name}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
};

export default SkillsChart;
