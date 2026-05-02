/**
 * auth.js
 * Provides getToken() that calls /auth with client credentials.
 * Intended for local/dev use or server-side use only.
 */

const fetch = global.fetch || require('node-fetch');
const API_BASE = process.env.API_BASE || 'http://20.207.122.201/evaluation-service';

async function getToken({ clientId, clientSecret, email, name, rollNo, accessCode } = {}) {
  clientId = clientId || process.env.CLIENT_ID;
  clientSecret = clientSecret || process.env.CLIENT_SECRET;
  email = email || process.env.EMAIL;
  name = name || process.env.NAME;
  rollNo = rollNo || process.env.ROLL_NO;
  accessCode = accessCode || process.env.ACCESS_CODE;

  if (!clientId || !clientSecret) {
    throw new Error('CLIENT_ID and CLIENT_SECRET required (set env variables or pass arguments)');
  }

  const payload = { email, name, rollNo, accessCode, clientID: clientId, clientSecret };

  const res = await fetch(`${API_BASE.replace(/\/$/, '')}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Auth failed ${res.status}: ${txt}`);
  }

  return res.json();
}

module.exports = { getToken };
