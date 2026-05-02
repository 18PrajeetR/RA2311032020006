/**
 * pages/api/token.js
 * Server-side token endpoint. Returns a short-lived bearer token.
 * Keep CLIENT_ID and CLIENT_SECRET in env vars, never expose to browser.
 */

const API_BASE = process.env.API_BASE || 'http://20.207.122.201/evaluation-service';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const email = process.env.EMAIL;
  const name = process.env.NAME;
  const rollNo = process.env.ROLL_NO;
  const accessCode = process.env.ACCESS_CODE;

  // If credentials not configured, return null token (frontend will use mock data)
  if (!clientId || !clientSecret) {
    console.warn('Token endpoint: CLIENT_ID or CLIENT_SECRET not configured. Using mock data.');
    return res.status(200).json({ token: null, useMock: true });
  }

  try {
    const authRes = await fetch(`${API_BASE.replace(/\/$/, '')}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, rollNo, accessCode, clientID: clientId, clientSecret }),
    });

    if (!authRes.ok) {
      const txt = await authRes.text().catch(() => 'unknown error');
      return res.status(authRes.status).json({ error: `Auth failed: ${txt}` });
    }

    const data = await authRes.json();
    return res.status(200).json({ token: data.access_token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
