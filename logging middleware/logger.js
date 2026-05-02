/**
 * logging middleware
 * Exported function: Log(stack, level, pkg, message, options)
 * - stack: 'backend'|'frontend'
 * - level: 'debug'|'info'|'warn'|'error'|'fatal'
 * - pkg: one of allowed package names (see README)
 * - message: string or object
 * - options.token: optional bearer token to use for the API
 *
 * Notes:
 * - The function intentionally has no external dependencies.
 * - For browser usage, pass a short-lived bearer token via `options.token` to avoid embedding secrets.
 */

const DEFAULT_BASE = 'http://20.207.122.201/evaluation-service';
const LOG_PATH = '/logs';
const LOG_URL = (process && process.env && process.env.NEXT_PUBLIC_API_BASE)
  ? `${process.env.NEXT_PUBLIC_API_BASE.replace(/\/$/, '')}${LOG_PATH}`
  : `${DEFAULT_BASE}${LOG_PATH}`;

const ALLOWED_STACKS = ['backend', 'frontend'];
const ALLOWED_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'];

const BACKEND_PACKAGES = ['cache', 'controller', 'cron_job', 'db', 'domain', 'handler', 'repository', 'route', 'service'];
const FRONTEND_PACKAGES = ['api', 'component', 'hook', 'page', 'state', 'style'];
const SHARED_PACKAGES = ['auth', 'config', 'middleware', 'utils'];
const ALLOWED_PACKAGES = Array.from(new Set([...BACKEND_PACKAGES, ...FRONTEND_PACKAGES, ...SHARED_PACKAGES]));

function isLowerCaseString(s) {
  return typeof s === 'string' && s === s.toLowerCase();
}

async function Log(stack, level, pkg, message, options = {}) {
  if (!isLowerCaseString(stack) || !ALLOWED_STACKS.includes(stack)) {
    throw new Error(`Invalid stack: must be one of ${ALLOWED_STACKS.join(', ')}`);
  }
  if (!isLowerCaseString(level) || !ALLOWED_LEVELS.includes(level)) {
    throw new Error(`Invalid level: must be one of ${ALLOWED_LEVELS.join(', ')}`);
  }
  if (!isLowerCaseString(pkg) || !ALLOWED_PACKAGES.includes(pkg)) {
    throw new Error(`Invalid package: must be one of ${ALLOWED_PACKAGES.join(', ')}`);
  }

  const body = {
    stack,
    level,
    package: pkg,
    message: typeof message === 'string' ? message : JSON.stringify(message),
    timestamp: new Date().toISOString(),
  };

  // Token resolution: prefer explicit options.token. Fallback to process.env.LOG_BEARER_TOKEN (server-side only)
  const token = options && options.token
    ? options.token
    : (typeof process !== 'undefined' && process.env && process.env.LOG_BEARER_TOKEN)
      ? process.env.LOG_BEARER_TOKEN
      : null;

  if (!token) {
    throw new Error('Missing bearer token for Log(): pass options.token or set process.env.LOG_BEARER_TOKEN (server-side only)');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  // Use global fetch. Node 18+ has fetch; in older Node runtimes user may need a polyfill.
  const res = await fetch(LOG_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => null);
    const msg = text ? `: ${text}` : '';
    throw new Error(`Logging API responded ${res.status}${msg}`);
  }

  try {
    return await res.json();
  } catch (e) {
    return { success: true };
  }
}

// CommonJS + named export compatibility
module.exports = { Log };