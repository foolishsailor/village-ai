import { openAImodel } from '@/types/open-ai-model';

export interface ApplicationState {
  isConnected: boolean;
  agents: string[];
  numberOfAgents: number;
  modelType: openAImodel;
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
