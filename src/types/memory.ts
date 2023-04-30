export type MessageTypes =
  | 'message'
  | 'command'
  | 'action'
  | 'event'
  | 'data'
  | 'decision'
  | 'assistant'
  | 'user'
  | 'system';

export type DocumentTypes = 'OpenAi' | 'Memory';
export type PropertyTypes = 'DocumentType' | 'MessageType';

export interface Memory {
  types: {
    [key in PropertyTypes]?: key extends 'DocumentType'
      ? DocumentTypes
      : key extends 'MessageType'
      ? MessageTypes
      : never;
  }[];
  content: string[];
}

/**
 * An interface that represents a Chroma memory.
 * @interface ChromaMemory
 * @property {string[]} ids - The IDs associated with the memory.
 * @property {any[]} [embeddings] - The embeddings associated with the memory.
 * @property {string[]} documents - The documents associated with the memory.
 * @property {any[]} [metadatas] - The metadata associated with the memory.
 */
export interface ChromaMemory {
  ids: string[];
  embeddings?: any[];
  documents: string[];
  metadatas?: any[];
}
