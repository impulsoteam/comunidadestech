import express from 'express';

import routes from '../../server/routes';

const server = express();

// server.use(express.json());
server.use('/', routes);

module.exports = server;
