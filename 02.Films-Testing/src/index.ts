import { env } from './config/env.ts';
import debug from 'debug';
import { connectDB } from './config/db-config.ts';
import { createServer } from 'node:http';
import { createApp } from './app.ts';

const log = debug(`${env.PROJECT_NAME}:index`);
log('Starting API server...');

const prisma = await connectDB();

const port = env.PORT || 3000;
const app = createApp(prisma);

const server = createServer(app);
log('Server created');

const listenManager = () => {
  const addr = server.address();
  if (addr === null) return;
  let bind;
  if (typeof addr === 'string') {
    bind = 'pipe ' + addr;
  } else {
    bind =
      addr.address === '::'
        ? `http://localhost:${addr?.port}`
        : `${addr.address}:${addr?.port}`;
  }
  if (env.NODE_ENV !== 'dev') {
    console.log(`Server listening on ${bind}`);
  } else {
    log(`Servidor escuchando en ${bind}`);
  }
};

server.on('listening', listenManager);
server.listen(port);
