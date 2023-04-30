import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { messageBus } from '@/services/message-bus';
import * as dotenv from 'dotenv';
import { Message, MessageType } from '@/types/message';
import { setIsConnected } from '@/store/applicationSlice';
import store from '@/store';
import { CommandActions } from './commands/command-actions';
import { CommandActionsEnum } from './commands/command-types';

dotenv.config();

export class SocketServer {
  private static instance: SocketServer;
  private httpServer: any;
  public Socket: any;
  private connectedSockets: { [clientId: string]: boolean } = {};

  private constructor() {}

  public static getInstance(port: number): SocketServer {
    if (!SocketServer.instance) {
      SocketServer.instance = new SocketServer();
      SocketServer.instance.init(port);
    }

    return SocketServer.instance;
  }

  public emit(message: Message): void {
    this.Socket.emit('message', message);
  }

  private init(port: number): void {
    this.httpServer = createServer();
    this.Socket = new Server(this.httpServer, {
      cors: {
        origin: '*'
      }
    });

    this.Socket.use((socket: Socket, next: () => void) => {
      console.log('Socket middleware');
      const clientId = socket.id;

      if (this.connectedSockets[clientId]) {
        // Client is already connected, so disconnect this new connection
        socket.disconnect();
        return;
      }

      // Add the new connection to the connectedSockets object
      this.connectedSockets[clientId] = true;

      // Call the next middleware
      next();
    });

    this.Socket.on('connection', (socket: Socket) => {
      console.log('A user connected');
      store.dispatch(setIsConnected(true));

      messageBus.subscribe((message: Message) => {
        socket.emit('message', message);
      });

      socket.on('message', (message: Message) => {
        const commandActions = CommandActions();

        switch (message.type) {
          case MessageType.Command:
            commandActions[CommandActionsEnum[message.content.action]](
              message.content.content
            );
            break;
          case MessageType.State:
            break;
          case MessageType.Message:
            messageBus.send(message);
            break;
        }
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected');
        store.dispatch(setIsConnected(false));
      });
    });

    this.httpServer.listen(port, () => {
      console.log(`Socket.IO server is listening on port ${port}`);
    });
  }
}

export const AILensSocketServer = SocketServer.getInstance(
  Number(process.env.AI_LENS_SOCKET_PORT)
);
