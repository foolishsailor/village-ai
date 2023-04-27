import { EventEmitter } from 'events';
import { Message } from '@/types/message';

export const MessageBusEmitter = new EventEmitter();

export class MessageBus {
  subscribe(listener: (message: Message) => void): void {
    MessageBusEmitter.on('message', listener);
  }

  unsubscribe(listener: (message: Message) => void): void {
    MessageBusEmitter.off('message', listener);
  }

  send(message: Message): void {
    MessageBusEmitter.emit('message', message);
  }
}
