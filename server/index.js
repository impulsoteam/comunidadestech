import express from 'express';
import next from 'next';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import 'express-async-errors';

import routes from './routes';

// import './models/allocation';

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(`Error: ${err}`);
});

const port = process.env.PORT;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const COOKIE_SECRET = 'secret';
app
  .prepare()
  .then(() => {
    const server = express();

    server.use(express.json());
    server.use(cookieParser(COOKIE_SECRET));
    server.use('/api/v1', routes);
    server.use((error, req, res, next) => res.status(500).json(error));
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
