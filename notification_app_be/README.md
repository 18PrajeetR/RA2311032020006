# notification_app_be

Server-side helper scripts for the evaluation APIs.

Files
- `register.js` — run once to register and obtain `clientID` and `clientSecret`.
- `auth.js` — helper to obtain bearer token from `/auth`.

Usage
1. Create a `.env` with credentials (do NOT commit):

```
CLIENT_ID=...
CLIENT_SECRET=...
EMAIL=...
NAME=...
ROLL_NO=...
ACCESS_CODE=...
API_BASE=http://20.207.122.201/evaluation-service
```

2. Run registration manually (only if you haven't already):

```bash
node register.js
```

3. Use `getToken()` from `auth.js` in server-side code. Do NOT expose client secret to the browser.
