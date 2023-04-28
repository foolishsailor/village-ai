import { createServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';
import { messageBus } from '@/services/message-bus';

import { commandMessageReducer } from './commands/command-reducer';
import { CommandActions } from './commands/command-actions';

const SocketServer = (port: number): void => {
  const httpServer = createServer();
  const io = new IOServer(httpServer, {
    cors: {
      origin: '*'
    }
  });

  const commandActions = CommandActions();

  io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    messageBus.subscribe((message) => {
      socket.emit('message', message);
    });

    socket.on('message', (message) => {
      switch (message.type) {
        case 'state':
          //stateMessageReducer(message.content);
          break;

        case 'command':
          commandMessageReducer(message.content, commandActions);
          break;

        case 'message':
          messageBus.send({
            type: 'agent',
            sourceType: 'agent',
            source: message.agentIds || '',
            destination: message.destination || [],
            content: message.content
          });
          break;
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  httpServer.listen(port, () => {
    console.log(`Socket.IO server is listening on port ${port}`);
  });
};

export default SocketServer;
