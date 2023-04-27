import * as dotenv from 'dotenv';
import { vectorDb } from '@/services/vectorDB/chroma-db-service';
import SocketServer from '@/services/socket-server/socket-server';
import { agent } from '@/agents/agent';

dotenv.config();

SocketServer(4331);

const vector = vectorDb;

(async () => {
  const manager = agent({
    name: 'Steve',
    role: 'Manager',
    goal: 'You need to build a team that can tell me how to build a house in california'
  });
})();
