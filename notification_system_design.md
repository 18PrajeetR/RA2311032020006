# Notification System Design

## Overview
This document will capture the frontend and backend design for the notification system.

## Scope
- Notification delivery flow
- Backend API responsibilities
- Frontend notification display behavior
- Logging and observability

## Stage 1 — Priority Selection (Summary)

Stage 1 requires a solution that fetches notifications from the protected API and returns the top `n` highest-priority unread notifications. Priority is a function of notification type and recency. The repository already contains a `logging middleware` folder where a reusable `Log()` function is implemented.

Approach
- Fetch notifications from the Notifications API (`/notifications`).
- Score each notification: `typeWeight = { Placement: 3, Result: 2, Event: 1 }`, `recencyScore = 1 / (hoursAgo + 1)`, `finalScore = typeWeight * (1 + recencyScore)`.
- Return the top `n` by score. For small `n` a sort is acceptable; a heap is optional for higher efficiency.

Files added for Stage 1
- `notification_app_fe/src/api/priorityEngine.js` — scoring and `topNFromList(list, N)` helper.

Notes on mistakes and better solutions
- Mistake: storing `CLIENT_SECRET` or long-lived tokens in the browser. Better: keep credentials server-side and obtain a short-lived token via a secure server-side endpoint (Next.js API route or a small Node service). When testing locally, only use a manual token and never commit secrets.
- Mistake: heavy processing in render loops. Better: compute scores in the API/hook layer and avoid re-computing on every render; memoize results.

## Stage 2 — Frontend App (Summary)

The frontend app is built as a Next.js project under `notification_app_fe/`. It exposes pages:
- `/notifications` — full notification list
- `/priority` — top-n priority view with filter controls

State & Seen/Unseen
- `NotificationContext` stores fetched notifications and a `seenIds` set persisted to `localStorage`.
- On render, any notification ID not in `seenIds` shows a `NEW` badge.
- On visibility (or click), the app adds the ID to `seenIds` and persists it locally. No server write is required.

Logging
- Use the provided `Log(stack, level, package, message)` middleware. Pass a short-lived token via `options.token` in the browser or set `LOG_BEARER_TOKEN` server-side.

Why this scales
- Server-side token handling avoids exposing secrets.
- The scoring is O(M log N) with a heap or O(M log M) with a sort; for expected notification volumes it's fast.

Next steps
- Implement server-side token endpoint if you plan to refresh tokens automatically in the browser.
- Add tests for `priorityEngine` scoring.

