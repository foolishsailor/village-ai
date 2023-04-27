import { Memory } from '@/types/memory';
import { ChromaClient, Collection, OpenAIEmbeddingFunction } from 'chromadb';
import { EventEmitter } from 'events';

export type CollectionAddData = [
  string | string[],
  number[] | number[][] | undefined,
  object | object[] | undefined,
  string | string[] | undefined,
  boolean | undefined
];

class VectorDBEventBusClass extends EventEmitter {
  //Events class listens to
  on(event: 'listCollections', listener: () => void): this;
  on(event: 'getCollection', listener: (collectionName: string) => void): this;
  on(
    event: 'createCollection',
    listener: (collectionName: string) => void
  ): this;
  on(
    event: 'addDataToCollection',
    listener: (collectionName: string, memory: Memory) => void
  ): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }

  //Events class broadcasts
  emit(event: 'listCollectionsResult', collections: Collection[]): boolean;
  emit(event: 'getCollectionResult', collection: Collection | null): boolean;
  emit(event: 'createCollectionResult', collection: Collection): boolean;
  emit(
    event: 'addDataToCollectionResult',
    collectionName: string,
    result: any
  ): boolean;

  //Events that can be emmited by external functions/events
  emit(event: 'listCollections', collections: Collection[]): boolean;
  emit(event: 'getCollection', collectionName: string): boolean;
  emit(event: 'createCollection', collectionName: string): boolean;
  emit(
    event: 'addDataToCollection',
    collectionName: string,
    memory: Memory
  ): boolean;

  emit(event: string | symbol, ...args: any[]): boolean {
    return super.emit(event, ...args);
  }
}

export const VectorDBEventBus = new VectorDBEventBusClass();

export class VectorDB {
  private vectorClient: ChromaClient;
  private embeddingService: OpenAIEmbeddingFunction;

  constructor(
    vectorClient: ChromaClient,
    embeddingService: OpenAIEmbeddingFunction
  ) {
    this.vectorClient = vectorClient;
    this.embeddingService = embeddingService;

    this.subscribeToEvents();
  }

  private subscribeToEvents() {
    VectorDBEventBus.on('listCollections', this.listCollections.bind(this));
    VectorDBEventBus.on('getCollection', this.getCollection.bind(this));
    VectorDBEventBus.on('createCollection', this.createCollection.bind(this));
    VectorDBEventBus.on(
      'addDataToCollection',
      this.addDataToCollection.bind(this)
    );
  }

  public async listCollections(): Promise<void> {
    const collections: Collection[] = await this.vectorClient.listCollections();
    VectorDBEventBus.emit('listCollectionsResult', collections);
  }

  public async getCollection(collectionName: string): Promise<void> {
    const collection = await this.vectorClient.getCollection(collectionName);

    if (!collection) {
      VectorDBEventBus.emit('getCollectionResult', null);
      return;
    }

    const result = await this.vectorClient.getCollection(
      collectionName,
      this.embeddingService
    );
    VectorDBEventBus.emit('getCollectionResult', result);
  }

  public async createCollection(collectionName: string): Promise<void> {
    const check = await this.vectorClient.getCollection(collectionName);

    if (check) {
      VectorDBEventBus.emit('createCollectionResult', check);
      return;
    }

    const result = await this.vectorClient.createCollection(
      collectionName,
      {},
      this.embeddingService
    );
    VectorDBEventBus.emit('createCollectionResult', result);
  }

  public async addDataToCollection(
    collectionName: string,
    memory: Memory
  ): Promise<void> {
    // data: CollectionAddData
    const collection = await this.vectorClient.getCollection(collectionName);

    if (!collection) {
      VectorDBEventBus.emit('addDataToCollectionResult', collectionName, false);
      return;
    }

    const memoryCount = await collection.count();
    const embedMemory =
      memory.type === 'message'
        ? JSON.stringify(memory.content)
        : (memory.content as string);

    const result = await collection.add(
      memoryCount,
      undefined,
      [{ type: memory.type }],
      embedMemory
    );
    VectorDBEventBus.emit('addDataToCollectionResult', collectionName, result);
  }
}
