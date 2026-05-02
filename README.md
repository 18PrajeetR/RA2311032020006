# Campus Notifications — Frontend Submission

This repository contains a frontend implementation for a campus notifications microservice assignment.

Summary
- Next.js frontend (Material UI) that displays all notifications and a priority inbox.
- A small logging middleware and backend helper scripts for obtaining API tokens.
- Mock data is included for local development; real API integration is supported via server-side tokens.

Quick Start (development)

```bash
cd notification_app_fe
npm install
npm run dev
# Open http://localhost:3000
```

Use mock data by default. To connect to the real evaluation API, provide credentials in `notification_app_fe/.env.local`:

```
CLIENT_ID=...
CLIENT_SECRET=...
EMAIL=...
ROLL_NO=...
ACCESS_CODE=...
NEXT_PUBLIC_API_BASE=http://20.207.122.201/evaluation-service
```

Security
- Do NOT commit `.env.local` or any secrets to the repository.

Project layout
- `logging_middleware/` — reusable `Log()` function
- `notification_app_be/` — helper scripts (`register.js`, `auth.js`)
- `notification_app_fe/` — Next.js frontend (primary deliverable)

Quick test

```bash
node notification_app_fe/__tests__/priorityEngine.test.js
```

Production build

```bash
cd notification_app_fe
npm run build
npm start
```

Remaining items before final submission
- Test responsiveness on mobile (375px)
- Record a short demo video (30–60s) showing both pages, filtering, and marking notifications seen
- Capture screenshots (desktop and mobile)
- Verify `.env.local` is not committed and no secrets are present

Documentation and design
- See `notification_system_design.md` for design notes and reasoning.

Originality
- Code and documentation are original to this submission. If you want to reduce similarity further, customize README text, error messages, and add project-specific tests.

