import { Memory } from '@/types/memory';
import { ChromaClient, Collection, OpenAIEmbeddingFunction } from 'chromadb';
import { logger } from '@/services/logger';

interface MyObject {
  name: string;
  metadata: Record<string, unknown>;
}

function arrayContainsName(objects: MyObject[], targetName: string): boolean {
  const names: string[] = objects.reduce((acc: string[], curr: MyObject) => {
    acc.push(curr.name);
    return acc;
  }, []);

  return names.includes(targetName);
}

export type CollectionAddData = [
  string | string[],
  number[] | number[][] | undefined,
  object | object[] | undefined,
  string | string[] | undefined,
  boolean | undefined
];

export class VectorDB {
  private static instance: VectorDB;
  private vectorClient: ChromaClient;
  private embeddingService: OpenAIEmbeddingFunction;

  constructor(
    vectorClient: ChromaClient,
    embeddingService: OpenAIEmbeddingFunction
  ) {
    this.vectorClient = vectorClient;
    this.embeddingService = embeddingService;
  }

  public static getInstance(
    vectorClient: ChromaClient,
    embeddingService: OpenAIEmbeddingFunction
  ): VectorDB {
    if (!VectorDB.instance) {
      VectorDB.instance = new VectorDB(vectorClient, embeddingService);
    }
    return VectorDB.instance;
  }

  public async listCollections(): Promise<Collection[]> {
    return await this.vectorClient.listCollections();
  }

  public async getCollection(
    collectionName: string
  ): Promise<Collection | null> {
    const collection = await this.vectorClient.getCollection(
      collectionName,
      this.embeddingService
    );

    if (!collection) return null;

    return await this.vectorClient.getCollection(
      collectionName,
      this.embeddingService
    );
  }

  public async createCollection(collectionName: string): Promise<Collection> {
    const collections = await this.vectorClient.listCollections();
    const collectionExists = collections
      ? arrayContainsName(collections, collectionName)
      : false;

    if (collectionExists) {
      logger.debug(
        'VectorDB',
        'createCollection',
        `collection exists: ${collectionName}`
      );

      return await this.vectorClient.getCollection(
        collectionName,
        this.embeddingService
      );
    } else {
      logger.debug(
        'VectorDB',
        'createCollection',
        `collection created: ${collectionName}`
      );

      return await this.vectorClient.createCollection(
        collectionName,
        {},
        this.embeddingService
      );
    }
  }

  public async addDataToCollection(
    collectionName: string,
    memory: Memory
  ): Promise<boolean> {
    const collection = await this.vectorClient.getCollection(
      collectionName,
      this.embeddingService
    );

    if (!collection) {
      logger.debug(
        'VectorDB',
        'addDataToCollection',
        `collection not found: ${collectionName}`
      );

      return false;
    } else {
      logger.debug(
        'VectorDB',
        'addDataToCollection',
        `collection found: ${collectionName}`
      );

      const memoryCount = await collection.count();

      const embedMemory =
        memory.type === 'message'
          ? JSON.stringify(memory.content)
          : (memory.content as string);

      logger.debug(
        'VectorDB',
        'addDataToCollection',
        `embedMemory: ${embedMemory}`
      );

      return await collection.add(
        (memoryCount + 1).toString(),
        undefined,
        [{ type: memory.type }],
        embedMemory
      );
    }
  }
}
