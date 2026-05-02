import React from 'react';
import { Slider, Chip, Stack } from '@mui/material';

export default function PriorityControls({ n = 10, onChangeN = () => {}, typeFilter = '', onFilterChange = () => {} }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
      <div style={{ width: 240 }}>
        <div>Top N: {n}</div>
        <Slider min={1} max={50} value={n} onChange={(e, v) => onChangeN(v)} />
      </div>
      <div>
        <Chip label="All" onClick={() => onFilterChange('')} clickable color={typeFilter === '' ? 'primary' : 'default'} sx={{ mr: 1 }} />
        <Chip label="Placement" onClick={() => onFilterChange('Placement')} clickable color={typeFilter === 'Placement' ? 'primary' : 'default'} sx={{ mr: 1 }} />
        <Chip label="Result" onClick={() => onFilterChange('Result')} clickable color={typeFilter === 'Result' ? 'primary' : 'default'} sx={{ mr: 1 }} />
        <Chip label="Event" onClick={() => onFilterChange('Event')} clickable color={typeFilter === 'Event' ? 'primary' : 'default'} />
      </div>
    </Stack>
  );
}
