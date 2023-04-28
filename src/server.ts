import * as dotenv from 'dotenv';
import { client } from '@/services/vectorDB/chroma-db-service';
import SocketServer from '@/services/socket-server/socket-server';
import { logger, LogLevel, LogOptions } from '@/services/logger';
import { Agent } from '@/agents/agent';

const options: LogOptions = {
  toConsole: true,
  toFile: true,
  filePath: 'logs.txt'
};

logger.setOptions(LogLevel.Debug, options);

dotenv.config();

SocketServer(4331);

(async () => {
  await client.reset();

  const manager = new Agent({
    name: 'Bob',
    role: 'Manager',
    goal: 'You need to build a team that can tell me how to build a house in california'
  });
})();
