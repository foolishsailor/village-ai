import * as dotenv from 'dotenv';
import { client } from '@/services/vectorDB/chroma-db-service';
import { logger, LogLevel, LogOptions } from '@/services/logger';
import { run } from '@/agents/agentTypes/planning-agent/planning-agent';
const options: LogOptions = {
  toConsole: true,
  toFile: true,
  filePath: 'logs.txt'
};

logger.setOptions(LogLevel.Debug, options);

dotenv.config();

(async () => {
  await client.reset();
  run();
  //agent startup now in soclket-server/commands/commandactions - start
})();
