import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.01,
});