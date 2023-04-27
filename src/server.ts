import * as dotenv from 'dotenv';
import { vectorDB } from '@/services/vectorDB/chroma-db-service';
import SocketServer from '@/services/socket-server/socket-server';
import { agent } from '@/agents/agent';

dotenv.config();

SocketServer(4331);

(async () => {
  const collections = await vectorDB.listCollections();

  console.log('collections', collections);

  const manager = agent({
    name: 'Bob',
    role: 'Manager',
    goal: 'You need to build a team that can tell me how to build a house in california'
  });
})();
