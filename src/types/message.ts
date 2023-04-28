export type MessageSource = 'agent' | 'system' | 'control';
export type ParsedMessageType = 'error' | 'action' | 'decision';
export type MessageType = 'error' | 'agent' | 'update' | 'random';

export interface Message {
  type: MessageType;
  sourceType: MessageSource;
  source?: string; // agentId
  destination: string[]; //agentId
  content: string;
}
