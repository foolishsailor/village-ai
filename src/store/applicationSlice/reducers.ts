import { Agent } from '@/types/agent';
import { OpenAImodelTypes } from '@/types/openai';
import { PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from './state';

export const reducers = {
  setIsConnected: (state: ApplicationState, action: PayloadAction<boolean>) => {
    state.isConnected = action.payload;
  },
  setIsRunning: (state: ApplicationState, action: PayloadAction<boolean>) => {
    state.isRunning = action.payload;
  },
  addAgents: (state: ApplicationState, action: PayloadAction<Agent[]>) => {
    state.agents = [...state.agents, ...action.payload];
  },
  deleteAgents: (state: ApplicationState, action: PayloadAction<string[]>) => {
    state.agents = state.agents.filter(
      (agent) => !action.payload.includes(agent.id)
    );
  },
  setModelType: (
    state: ApplicationState,
    action: PayloadAction<OpenAImodelTypes>
  ) => {
    state.modelType = action.payload;
  },
  setOpenAIKey: (state: ApplicationState, action: PayloadAction<string>) => {
    state.openAIKey = action.payload;
  },
  setTokensUsed: (state: ApplicationState, action: PayloadAction<number>) => {
    state.tokensUsed = state.tokensUsed + action.payload;
  }
};
