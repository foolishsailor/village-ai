import applicationSlice from './applicationSlice/slice';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import { AILensSocketServer } from '@/services/socket-server/socket-server';
import { MessageType } from '@/types/message';

// Custom middleware to send only the changed state via WebSocket
const socketMiddleware: Middleware = (storeApi) => (next) => async (action) => {
  const aILensSocketServer = await AILensSocketServer;
  // Get the previous state
  const prevState = storeApi.getState();

  // Process the action and get the new state
  const result = next(action);
  const newState = storeApi.getState();

  // Find the changed properties in the state
  const changedState: Partial<RootState> & { [key: string]: any } = {};

  for (const key in newState) {
    if (JSON.stringify(prevState[key]) !== JSON.stringify(newState[key])) {
      changedState[key] = newState[key];
    }
  }

  // Send the changed state as a  message
  if (
    changedState.application &&
    Object.keys(changedState.application).length > 0
  ) {
    aILensSocketServer.emit({
      type: MessageType.State,
      content: {
        store: 'application',
        action: 'set',
        properties: changedState.application
      }
    });
  }

  return result;
};

const store = configureStore({
  reducer: {
    application: applicationSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
