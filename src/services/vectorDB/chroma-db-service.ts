import chalk from 'chalk';
import store from '@/store/store';
import * as dotenv from 'dotenv';
import * as console from 'console';
import { ChromaClient, Collection, OpenAIEmbeddingFunction } from 'chromadb';

import { VectorDB } from './vector-db';
import { setOpenAIKey } from '@/store/applicationSlice/slice';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.log(chalk.red('OPENAI_API_KEY Key Not Found in the .env file'));
  process.exit(1);
}

store.dispatch(setOpenAIKey(process.env.OPENAI_API_KEY));

const client = new ChromaClient();
const embedding = new OpenAIEmbeddingFunction(process.env.OPENAI_API_KEY);

export const vectorDb = new VectorDB(client, embedding);
