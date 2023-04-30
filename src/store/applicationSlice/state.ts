import { Agent } from '@/types/agent';
import { OpenAImodelTypes } from '@/types/openai';

export interface ApplicationState {
  isConnected: boolean;
  agents: Agent[];
  modelType: OpenAImodelTypes;
  openAIKey?: string;
  tokensUsed: number;
}

export const initialState: ApplicationState = {
  isConnected: false,
  agents: [],
  modelType: 'gpt-3.5-turbo',
  openAIKey: undefined,
  tokensUsed: 0
};
