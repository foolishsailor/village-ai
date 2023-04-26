import { ChromaClient, Collection, OpenAIEmbeddingFunction } from 'chromadb';
import { EventEmitter } from 'events';

export const VectorDBEventBus = new EventEmitter();

/*
[ids, embeddings, metadatas, documents, increment_index]
*/
export type CollectionAddData = [
  string | string[],
  number[] | number[][] | undefined,
  object | object[] | undefined,
  string | string[] | undefined,
  boolean | undefined
];

export class VectorDBService {
  // NOTE: The ChromaClient and OpenAIEmbeddingFunction types need to be replaced
  // with generics a implment a class that exposes more generic functions so that other vector dbs can be used
  // need to look at the other providers to see what common terminology and functionality is shared
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

  public async listCollections() {
    return await this.vectorClient.listCollections();
  }

  public async getCollection(collectionName: string) {
    const collections = await this.vectorClient.listCollections();
    const collection = collections.find(
      (collection: Collection) => collection.name === collectionName
    );

    if (!collection) return null;

    return await this.vectorClient.getCollection(
      collectionName,
      this.embeddingService
    );
  }

  public async createCollection(collectionName: string) {
    const check = await this.vectorClient.getCollection(collectionName);

    if (check) return check;

    return await this.vectorClient.createCollection(
      collectionName,
      {},
      this.embeddingService
    );
  }

  public async addDataToCollection(
    collection: Collection,
    data: CollectionAddData
  ) {
    return await collection.add(...data);
  }

  // Pub/sub methods

  public async emitListCollections() {
    VectorDBEventBus.emit('listCollections');
  }

  public async emitGetCollection(collectionId: string) {
    VectorDBEventBus.emit('getCollection', collectionId);
  }

  public async emitCreateCollection(collectionData: any) {
    VectorDBEventBus.emit('createCollection', collectionData);
  }

  public async emitAddDataToCollection(
    collection: Collection,
    data: CollectionAddData
  ) {
    VectorDBEventBus.emit('addDataToCollection', collection, data);
  }
}
