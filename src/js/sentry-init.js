import * as Sentry from '@sentry/browser';

export function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: 'unboxertf@2.20',
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    allowUrls: [`${self.location.origin}/`],
  });
}

export function addSentryState(getState) {
  Sentry.getGlobalScope().addEventProcessor(event => {
    try {
      const { tags = {}, contexts = {} } = getState() || {};
      event.tags = { ...tags, ...event.tags };
      event.contexts = { ...contexts, ...event.contexts };
    } catch {
      // State may not be initialized yet if the error happened during startup
    }
    return event;
  });
}
