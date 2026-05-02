# Logging Middleware

This folder contains a small logging function for both backend and frontend use.

Exported API
- `Log(stack, level, pkg, message, options)`

Usage notes
- `stack`: `backend` or `frontend` (lowercase)
- `level`: one of `debug`, `info`, `warn`, `error`, `fatal` (lowercase)
- `pkg`: package name (see allowed list below)
- `message`: string or object (objects are JSON.stringified)
- `options.token`: preferred way to pass a short-lived bearer token (recommended for browser)

Allowed packages
- backend-only: `cache`, `controller`, `cron_job`, `db`, `domain`, `handler`, `repository`, `route`, `service`
- frontend-only: `api`, `component`, `hook`, `page`, `state`, `style`
- shared: `auth`, `config`, `middleware`, `utils`

Security
- Do NOT embed client secrets or long-lived credentials in browser code.
- For frontend usage, obtain a short-lived bearer token from a secure backend or pass one manually via `options.token` during development.
- For server-side usage you can set `LOG_BEARER_TOKEN` in the environment and the middleware will pick it up automatically.

Examples

Node (server-side):

```js
const { Log } = require('../logging middleware/logger');

// ensure process.env.LOG_BEARER_TOKEN is set on the server
await Log('backend', 'info', 'service', 'startup complete');
```

Browser (frontend) - pass token explicitly:

```js
import { Log } from '../logging middleware/logger';

// token should be obtained by a secure flow and passed here
await Log('frontend', 'debug', 'component', 'user opened notifications', { token: '<SHORT_LIVED_TOKEN>' });
```

If your Node runtime does not have `fetch` available, install a polyfill or run on Node 18+.
