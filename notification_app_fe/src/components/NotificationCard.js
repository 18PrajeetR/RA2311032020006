import React from 'react';
import { Card, CardContent, Typography, Chip, Badge } from '@mui/material';

export default function NotificationCard({ notification, isNew, onMarkSeen }) {
  const handleClick = () => {
    if (onMarkSeen) onMarkSeen(notification.ID);
  };

  return (
    <Card 
      variant="outlined" 
      sx={{ mb: 1, cursor: 'pointer', backgroundColor: isNew ? '#f0fff0' : 'transparent' }}
      onClick={handleClick}
    >
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <Typography variant="subtitle2" color="primary">{notification.Type}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>{notification.Message}</Typography>
          </div>
          <div style={{ textAlign: 'right', marginLeft: 16 }}>
            <Typography variant="caption" color="textSecondary">{notification.Timestamp}</Typography>
            {isNew && <Chip label="NEW" color="primary" size="small" sx={{ ml: 1 }} />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
