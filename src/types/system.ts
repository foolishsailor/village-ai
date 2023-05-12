import { OpenAImodelTypes } from './openai';

export interface EnvType {
  OPENAI_API_KEY: string;
  DEFAULT_OPENAI_MODEL: OpenAImodelTypes;
  OPENAI_API_HOST: string;
  DEFAULT_TEMPERATURE: number;
  OPENAI_API_TYPE: string;
  OPENAI_API_VERSION: string;
  AI_LENS_SOCKET_PORT: number;
  GOOGLE_API_KEY: string;
  GOOGLE_SEARCH_ENGINE_ID: string;
  OPENAI_API_ORG_ID: string;
}

export const env: EnvType = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
  DEFAULT_OPENAI_MODEL: process.env.DEFAULT_OPENAI_MODEL! as OpenAImodelTypes,
  OPENAI_API_HOST: process.env.OPENAI_API_HOST!,
  DEFAULT_TEMPERATURE: process.env.DEFAULT_TEMPERATURE! as unknown as number,
  OPENAI_API_TYPE: process.env.OPENAI_API_TYPE!,
  OPENAI_API_VERSION: process.env.OPENAI_API_VERSION!,
  AI_LENS_SOCKET_PORT: process.env.AI_LENS_SOCKET_PORT! as unknown as number,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY!,
  GOOGLE_SEARCH_ENGINE_ID: process.env.GOOGLE_SEARCH_ENGINE_ID!,
  OPENAI_API_ORG_ID: process.env.OPENAI_API_ORG_ID!
};
