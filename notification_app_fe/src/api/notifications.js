const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://20.207.122.201/evaluation-service';

async function fetchToken() {
  const res = await fetch('/api/token', { method: 'POST' });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'unknown' }));
    throw new Error(`Failed to get token: ${err.error}`);
  }
  const data = await res.json();
  return data.token;
}

async function fetchNotifications({ page = 1, limit = 50, notification_type = '', token, useMock = false } = {}) {
  // For local testing, optionally use mock data
  if (useMock) {
    const { getMockNotifications } = require('./mockData');
    return { notifications: getMockNotifications(limit, page, notification_type) };
  }

  const url = new URL(`${API_BASE.replace(/\/$/, '')}/notifications`);
  url.searchParams.set('page', String(page));
  url.searchParams.set('limit', String(limit));
  if (notification_type) url.searchParams.set('notification_type', notification_type);

  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) {
    const txt = await res.text().catch(() => null);
    throw new Error(`fetchNotifications failed ${res.status}: ${txt}`);
  }
  return res.json();
}

module.exports = { fetchNotifications, fetchToken };
