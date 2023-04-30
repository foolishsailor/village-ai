import { createServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';
import { messageBus } from '@/services/message-bus';
import * as dotenv from 'dotenv';
import { Message } from '@/types/message';

dotenv.config();

export class SocketServer {
  private static instance: SocketServer;
  private httpServer: any;
  private io: any;

  private constructor() {}

  public static getInstance(port: number): SocketServer {
    if (!SocketServer.instance) {
      SocketServer.instance = new SocketServer();
      SocketServer.instance.init(port);
    }

    return SocketServer.instance;
  }

  public emit(message: Message): void {
    this.io.emit('message', message);
  }

  private init(port: number): void {
    this.httpServer = createServer();
    this.io = new IOServer(this.httpServer, {
      cors: {
        origin: '*'
      }
    });

    this.io.on('connection', (socket: Socket) => {
      console.log('A user connected');

      messageBus.subscribe((message) => {
        socket.emit('message', message);
      });

      socket.on('message', (message) => {
        messageBus.send(message);
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected');
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
