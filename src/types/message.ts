import {
  CommandActionToMessage,
  CommandActions
} from '@/services/socket-server/commands/command-types';
import { StateActions } from './state';

export type ContentType = 'error' | 'agent' | 'update' | 'random';
export type MessageSource = 'agent' | 'system' | 'control';
export type ParsedMessageType = 'error' | 'action' | 'decision';

export enum MessageType {
  State = 'State',
  Command = 'Command',
  Message = 'Message'
}

export interface StateMessage<T> {
  type: MessageType.State;
  content: T;
}

export interface CommandMessage<T> {
  type: MessageType.Command;
  content: T;
}

export interface CommsMessage {
  type: MessageType.Message;
  content: {
    type: ContentType;
    sourceType: MessageSource;
    source?: string; // agentId
    destination: string[]; //agentId
    content: string;
  };
}

export type Message =
  | StateMessage<StateActions>
  | CommandMessage<CommandActionToMessage[CommandActions]>
  | CommsMessage;
