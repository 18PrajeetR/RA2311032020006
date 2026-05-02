import React, { useEffect, useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Tabs, Tab, Box, CircularProgress, Alert } from '@mui/material';
import { fetchNotifications } from '../src/api/notifications';
import NotificationList from '../src/components/NotificationList';
import { useNotifications } from '../src/state/NotificationContext';
import Link from 'next/link';

async function callLog(level, message) {
  try {
    // For now, just console log. In production, call the logging middleware via API route.
    console.log(`[${level}]`, message);
  } catch (e) {
    console.error(e);
  }
}

export default function NotificationsPage() {
  const { notifications, setNotifications, seenIds, markSeen, token } = useNotifications();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const useMock = !token; // use mock if no token

    fetchNotifications({ page: 1, limit: 50, useMock })
      .then(res => {
        if (!mounted) return;
        callLog('info', 'Notifications fetched successfully');
        setNotifications(res.notifications || []);
        setLoading(false);
      })
      .catch(err => {
        if (!mounted) return;
        callLog('error', `Failed to fetch notifications: ${err.message}`);
        setError(err.message || 'Failed to load notifications');
        setLoading(false);
      });
    return () => { mounted = false; };
  }, [token, setNotifications]);

  return (
    <Container maxWidth="md">
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Notifications</Typography>
          <Tabs value={0} textColor="inherit" indicatorColor="secondary">
            <Tab label="ALL" />
            <Tab label={<Link href="/priority">PRIORITY</Link>} />
          </Tabs>
        </Toolbar>
      </AppBar>

      {error && <Alert severity="error" sx={{ mb: 2 }}>Error: {error}</Alert>}
      {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
      {!loading && !error && (notifications.length === 0) && <Alert severity="info">No notifications yet.</Alert>}
      {!loading && !error && notifications.length > 0 && <NotificationList list={notifications} seenIds={seenIds} onMarkSeen={markSeen} />}
    </Container>
  );
}
