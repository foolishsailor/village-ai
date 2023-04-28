import { OpenAImodelTypes } from '@/types/openai';

export interface ApplicationState {
  isConnected: boolean;
  agents: string[];
  numberOfAgents: number;
  modelType: OpenAImodelTypes;
  openAIKey?: string;
  tokensUsed: number;
}

export const initialState: ApplicationState = {
  isConnected: false,
  agents: [],
  numberOfAgents: 0,
  modelType: 'gpt-3.5-turbo',
  openAIKey: undefined,
  tokensUsed: 0
};
