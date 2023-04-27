import { openAImodel } from '@/types/open-ai-model';
import { PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from './state';

export const reducers = {
  setIsConnected: (state: ApplicationState, action: PayloadAction<boolean>) => {
    state.isConnected = action.payload;
  },
  setActiveAgents: (
    state: ApplicationState,
    action: PayloadAction<string[]>
  ) => {
    state.agents = action.payload;
  },
  addAgents: (state: ApplicationState, action: PayloadAction<string[]>) => {
    state.agents = [...state.agents, ...action.payload];
  },
  deleteAgents: (state: ApplicationState, action: PayloadAction<string[]>) => {
    state.agents = state.agents.filter(
      (agent) => !action.payload.includes(agent)
    );
  },
  setNumberOfAgents: (
    state: ApplicationState,
    action: PayloadAction<number>
  ) => {
    state.numberOfAgents = action.payload;
  },
  setModelType: (
    state: ApplicationState,
    action: PayloadAction<openAImodel>
  ) => {
    state.modelType = action.payload;
  },
  setOpenAIKey: (state: ApplicationState, action: PayloadAction<string>) => {
    state.openAIKey = action.payload;
  }
};
