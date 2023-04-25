import { openAImodel } from '@/interfaces/open-ai-model';
import { PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from './state';

export const reducers = {
  setIsConnected(state: ApplicationState, action: PayloadAction<boolean>) {
    state.isConnected = action.payload;
  },

  setActiveAgents(state: ApplicationState, action: PayloadAction<string[]>) {
    state.agents = action.payload;
  },
  addAgents(state: ApplicationState, action: PayloadAction<string>) {
    state.agents.push(action.payload);
  },
  deteleAgents(state: ApplicationState, action: PayloadAction<string>) {
    state.agents = state.agents.filter((agent) => agent !== action.payload);
  },

  setNumberOfAgents(state: ApplicationState, action: PayloadAction<number>) {
    state.numberOfAgents = action.payload;
  },

  setModelType(state: ApplicationState, action: PayloadAction<openAImodel>) {
    state.modelType = action.payload;
  }
};