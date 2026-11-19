import { initSentry, addSentryState } from './sentry-init.js';

initSentry();

addSentryState(() => globalThis.unboxerSentryState?.());
