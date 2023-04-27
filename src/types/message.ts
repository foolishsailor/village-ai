export type MessageSource = 'agent' | 'system' | 'control';
export type MessageType = 'error' | 'agent' | 'update' | 'random';

export interface Message {
  type: MessageType;
  sourceType: MessageSource;
  source?: string;
  destination: string[];
  content: string;
}
