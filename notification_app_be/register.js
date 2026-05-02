/**
 * One-time registration script.
 * Run with: node register.js
 * It posts to /register and prints clientID and clientSecret.
 * Save results to a secure place (do NOT commit secrets).
 */

const fetch = global.fetch || require('node-fetch');

const API_BASE = process.env.API_BASE || 'http://20.207.122.201/evaluation-service';

async function run() {
  const payload = {
    email: process.env.EMAIL || 'student@example.edu',
    name: process.env.NAME || 'student',
    mobileNo: process.env.MOBILE_NO || '9999999999',
    githubUsername: process.env.GITHUB_USERNAME || 'github',
    rollNo: process.env.ROLL_NO || 'aa1bb',
    accessCode: process.env.ACCESS_CODE || 'xgAsNC'
  };

  const res = await fetch(`${API_BASE.replace(/\/$/, '')}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Response:', text);
}

if (require.main === module) {
  run().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
