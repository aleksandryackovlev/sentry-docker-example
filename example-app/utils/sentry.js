import * as Sentry from '@sentry/node';

module.exports = {
  initSentry: () => {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      release: process.env.SENTRY_RELEASE,
    });
  },
  captureException: (...args) => {
    Sentry.captureException(args);
  },
};
