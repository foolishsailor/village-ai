import * as dotenv from 'dotenv';
import { vectorDb } from '@/services/chromaDbService';

dotenv.config();

const vector = vectorDb;
(async () => {
  await vector.createCollection('test');
  const collection = await vector.getCollection('test');

  console.log('collection', collection);
})();
