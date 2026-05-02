import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchToken } from '../api/notifications';

const STORAGE_KEY = 'seen_notification_ids';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [seenIds, setSeenIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch (e) {
      return new Set();
    }
  });
  const [token, setToken] = useState(null);
  const [tokenError, setTokenError] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(seenIds)));
    } catch (e) {}
  }, [seenIds]);

  useEffect(() => {
    let mounted = true;
    fetchToken()
      .then(t => {
        if (mounted) {
          setToken(t);
          setTokenError(null);
        }
      })
      .catch(err => {
        if (mounted) {
          // Token fetch failed but app will use mock data
          console.log('Token unavailable, using mock data:', err.message);
          setToken(null);
          setTokenError(null); // Don't show error, just use mock
        }
      });
    return () => { mounted = false; };
  }, []);

  const markSeen = useCallback((id) => {
    setSeenIds(prev => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const value = { notifications, setNotifications, seenIds, markSeen, token, tokenError };
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}
