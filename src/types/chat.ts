import { OpenAIModel } from '@/types/openai';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export type ChatRole = 'assistant' | 'user' | 'system';

export interface ChatBody {
  model: OpenAIModel;
  messages: ChatMessage[];
  key: string;
  prompt: string;
  temperature: number;
}

export interface Conversation {
  id: string;
  name: string;
  messages: ChatMessage[];
  model: OpenAIModel;
  prompt: string;
  temperature: number;
  folderId: string | null;
}
