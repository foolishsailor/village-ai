import * as dotenv from 'dotenv';
import { vectorDb } from '@/services/vectorDB/chroma-db-service';
import { roles } from '@/agents/prompts/roles';

import { createChatCompletion } from '@/services/api/openai';

import SocketServer from '@/services/socket-server/socket-server';

dotenv.config();

SocketServer(4331);

const vector = vectorDb;

(async () => {
  // const collection = await vector.createCollection('test');
  // const completion = await createChatCompletion({
  //   systemPrompt: roles.Manager.prompt,
  //   messages: [
  //     {
  //       role: 'user',
  //       content:
  //         'I have given you a role now pretend ou are that role and Tell me about yourself'
  //     }
  //   ]
  // });
  // console.log('completion', JSON.stringify(completion.choices));
})();
