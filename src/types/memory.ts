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
  types: Array<{
    [key in PropertyTypes]?: key extends 'DocumentType'
      ? DocumentTypes
      : key extends 'MessageType'
      ? MessageTypes
      : never;
  }>;
  content: string;
}
