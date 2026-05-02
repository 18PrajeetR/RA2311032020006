
# notification_app_fe

Next.js frontend for the campus notifications app. Built with Material UI and a small API layer.

Development

```bash
cd notification_app_fe
npm install
npm run dev
```

The app runs at `http://localhost:3000` and uses mock notifications by default (no credentials required).

Connecting to the real API

Create a `.env.local` in `notification_app_fe` with these variables (server-side secrets must remain private):

```
NEXT_PUBLIC_API_BASE=http://20.207.122.201/evaluation-service
CLIENT_ID=YOUR_CLIENT_ID
CLIENT_SECRET=YOUR_CLIENT_SECRET
EMAIL=you@example.edu
ROLL_NO=aa1bb
ACCESS_CODE=xgAsNC
```

Notes
- The server-side token endpoint (`/api/token`) uses `CLIENT_ID` and `CLIENT_SECRET` and must not be exposed to the browser.
- Use mock data for UI testing and demo recordings; enable real API only when credentials are available.

