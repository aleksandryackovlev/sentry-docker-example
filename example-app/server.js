'use strict';

const startServer = require('./node_modules/next/dist/server/lib/start-server')
  .default;
const dotenv = require('dotenv');

dotenv.config();

startServer({ dir: __dirname }, process.env.BACKEND_PORT || 3000)
  .then(async app => {
    await app.prepare();
  })
  .catch(err => {
    console.error(err);

    process.exit(1);
  });
