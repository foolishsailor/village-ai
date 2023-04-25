import { openAImodel } from '@/interfaces/open-ai-model';

export interface ApplicationState {
  isConnected: boolean;
  agents: string[];
  numberOfAgents: number;
  modelType: openAImodel;
}

export const initialState: ApplicationState = {
  isConnected: false,
  agents: [],
  numberOfAgents: 0,
  modelType: 'gpt-3.5-turbo'
};
