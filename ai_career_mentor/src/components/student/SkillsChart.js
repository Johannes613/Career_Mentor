import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const data = [
  { name: 'SEO', value: 9, yValue: 1 },
  { name: 'React', value: 10, yValue: 2 },
  { name: 'Animation', value: 12, yValue: 3 },
  { name: 'Music', value: 14, yValue: 4 },
  { name: 'UX Design', value: 20, yValue: 5 },
  { name: 'UI Design', value: 35, yValue: 6 },
];

const COLORS = ['#FDBA8C', '#F87171', '#A78BFA', '#4ADE80', '#2DD4BF', '#60A5FA'].reverse();
const legendData = [...data].reverse();

const SkillsChart = () => (
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
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
            >
              <XAxis
                type="number"
                domain={[0, 40]}
                tickFormatter={(tick) => `${tick}%`}
                stroke="#a0a0a0"
                fontSize={12}
              />
              <YAxis
                type="number"
                dataKey="yValue"
                tickLine={false}
                axisLine={false}
                domain={[0, 7]}
                ticks={[1, 2, 3, 4, 5, 6]}
                fontSize={12}
              />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey="value" barSize={30} radius={[4, 4, 4, 4]}>
                <LabelList
                  dataKey="name"
                  position="insideLeft"
                  offset={10}
                  style={{ fill: 'white', fontWeight: 'bold' }}
                />
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[COLORS.length - 1 - index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Box
          sx={{
            width: '35%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            gap: 2,
            pl: 2,
          }}
        >
          {legendData.map((entry, index) => (
            <Box
              key={entry.name}
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '50%' }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: COLORS[index],
                }}
              />
              <Typography variant="body2">{entry.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default SkillsChart;