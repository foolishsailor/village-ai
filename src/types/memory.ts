import { Message } from './message';

export type MemoryType =
  | 'message'
  | 'command'
  | 'action'
  | 'event'
  | 'data'
  | 'decision';

export interface Memory {
  type: MemoryType;
  content: string | Message;
}
