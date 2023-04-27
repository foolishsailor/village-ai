import * as dotenv from 'dotenv';
import { chromaDB, client } from '@/services/vectorDB/chroma-db-service';
import SocketServer from '@/services/socket-server/socket-server';
import { logger, LogLevel, LogOptions } from '@/services/logger';

const options: LogOptions = {
  toConsole: true,
  toFile: true,
  filePath: 'logs.txt'
};

logger.setOptions(LogLevel.Info, options);

import { agent } from '@/agents/agent';

dotenv.config();

SocketServer(4331);

(async () => {
  //client.reset();

  const manager = agent({
    name: 'Bob',
    role: 'Manager',
    goal: 'You need to build a team that can tell me how to build a house in california'
  });
})();
