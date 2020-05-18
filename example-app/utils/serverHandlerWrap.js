import { initSentry, captureException } from './sentry';

initSentry();

const serverHandlerWrap = callback => {
  try {
    return callback();
  } catch (error) {
    captureException(error);
    return callback();
  }
};

export default serverHandlerWrap;
