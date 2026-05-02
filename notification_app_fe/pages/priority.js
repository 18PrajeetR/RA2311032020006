import React, { useEffect, useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Tabs, Tab, CircularProgress, Alert, Box } from '@mui/material';
import { fetchNotifications } from '../src/api/notifications';
import { topNFromList } from '../src/api/priorityEngine';
import PriorityControls from '../src/components/PriorityControls';
import NotificationList from '../src/components/NotificationList';
import { useNotifications } from '../src/state/NotificationContext';
import Link from 'next/link';

async function callLog(level, message) {
  try {
    console.log(`[${level}]`, message);
  } catch (e) {
    console.error(e);
  }
}

export default function PriorityPage() {
  const { notifications, setNotifications, seenIds, markSeen, token } = useNotifications();
  const [n, setN] = useState(10);
  const [filter, setFilter] = useState('');
  const [top, setTop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const useMock = !token;

    fetchNotifications({ page: 1, limit: 200, notification_type: filter, useMock })
      .then(res => {
        if (!mounted) return;
        const list = res.notifications || [];
        callLog('info', `Priority view: fetched ${list.length} notifications, computing top ${n}`);
        setNotifications(list);
        setTop(topNFromList(list, n));
        setLoading(false);
      })
      .catch(err => {
        if (!mounted) return;
        callLog('error', `Priority fetch failed: ${err.message}`);
        setError(err.message || 'Failed to load notifications');
        setLoading(false);
      });
    return () => { mounted = false; };
  }, [n, filter, token, setNotifications]);

  return (
    <Container maxWidth="md">
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Priority</Typography>
          <Tabs value={1} textColor="inherit" indicatorColor="secondary">
            <Tab label={<Link href="/notifications">ALL</Link>} />
            <Tab label="PRIORITY" />
          </Tabs>
        </Toolbar>
      </AppBar>

      {error && <Alert severity="error" sx={{ mb: 2 }}>Error: {error}</Alert>}
      {!error && <PriorityControls n={n} onChangeN={setN} typeFilter={filter} onFilterChange={setFilter} />}
      {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
      {!loading && !error && (top.length === 0) && <Alert severity="info">No priority notifications.</Alert>}
      {!loading && !error && top.length > 0 && <NotificationList list={top} seenIds={seenIds} onMarkSeen={markSeen} />}
    </Container>
  );
}
