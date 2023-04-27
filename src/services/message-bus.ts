import { EventEmitter } from 'events';
import { Message } from '@/types/message';

// Define the MessageBus class
export class MessageBus {
  private static instance: MessageBus;
  private eventEmitter: EventEmitter;

  private constructor() {
    this.eventEmitter = new EventEmitter();
  }

  // Get the singleton instance of the MessageBus
  public static getInstance(): MessageBus {
    if (!MessageBus.instance) {
      MessageBus.instance = new MessageBus();
    }
    return MessageBus.instance;
  }

  // Subscribe to an event
  public subscribe(listener: (message: Message) => void): void {
    this.eventEmitter.on('message', listener);
  }

  // Unsubscribe from an event
  public unsubscribe(listener: (message: Message) => void): void {
    this.eventEmitter.off('message', listener);
  }

  // Send a message (emit an event)
  public send(message: Message): void {
    this.eventEmitter.emit('message', message);
  }
}

// Export the MessageBus instance
export const messageBus = MessageBus.getInstance();
