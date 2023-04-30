/**
 * A type that represents the different OpenAI model types.
 * @typedef {'gpt-3.5-turbo' | 'gpt-4'} OpenAImodelTypes
 */
export type OpenAImodelTypes = 'gpt-3.5-turbo' | 'gpt-4';

/**
 * A type that represents the different roles that a message can have in the OpenAI API.
 * @typedef {'assistant' | 'user' | 'system'} OpenAIRole
 */
export type OpenAIRole = 'assistant' | 'user' | 'system';

/**
 * An interface that represents a message in the OpenAI API.
 * @interface OpenAIMessage
 * @property {OpenAIRole} role - The role of the message.
 * @property {string} content - The content of the message.
 */
export interface OpenAIMessage {
  role: OpenAIRole;
  content: string;
}

export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

/**
 * An interface that represents the choices made by the OpenAI API.
 * @interface Choices
 * @property {number} index - The index of the chosen message.
 * @property {string} finish_reason - The reason why the API finished generating messages.
 * @property {OpenAIMessage} message - The generated message.
 */
export interface Choices {
  index: number;
  finish_reason: string;
  message: OpenAIMessage;
}

/**
 * An interface that represents the response from the OpenAI API.
 * @interface OpenAIApiResponse
 * @property {string} id - The ID of the API response.
 * @property {string} object - The type of object returned by the API.
 * @property {number} created - The timestamp when the API response was created.
 * @property {OpenAImodelTypes} model - The model used for the API response.
 * @property {Usage} usage - The usage information for the API response.
 * @property {Choices[]} choices - The choices made by the API.
 */
export interface OpenAIApiResponse {
  id: string;
  object: string;
  created: number;
  model: OpenAImodelTypes;
  usage: Usage;
  choices: Choices[];
}

export interface OpenAIModel {
  id: string;
  name: string;
  maxLength: number; // maximum length of a message
  tokenLimit: number;
}

export type OpenAIMessageRequestProps = {
  key?: string;
  model?: OpenAIModel;
  systemPrompt: string;
  temperature?: number;
  tokens?: number;
  messages: OpenAIMessage[];
};

export enum OpenAIModelID {
  GPT_3_5 = 'gpt-3.5-turbo',
  GPT_3_5_AZ = 'gpt-35-turbo',
  GPT_4 = 'gpt-4',
  GPT_4_32K = 'gpt-4-32k'
}

// in case the `DEFAULT_MODEL` environment variable is not set or set to an unsupported model
export const fallbackModelID = OpenAIModelID.GPT_3_5;

export const OpenAIModels: Record<OpenAIModelID, OpenAIModel> = {
  [OpenAIModelID.GPT_3_5]: {
    id: OpenAIModelID.GPT_3_5,
    name: 'GPT-3.5',
    maxLength: 12000,
    tokenLimit: 4000
  },
  [OpenAIModelID.GPT_3_5_AZ]: {
    id: OpenAIModelID.GPT_3_5_AZ,
    name: 'GPT-3.5',
    maxLength: 12000,
    tokenLimit: 4000
  },
  [OpenAIModelID.GPT_4]: {
    id: OpenAIModelID.GPT_4,
    name: 'GPT-4',
    maxLength: 24000,
    tokenLimit: 8000
  },
  [OpenAIModelID.GPT_4_32K]: {
    id: OpenAIModelID.GPT_4_32K,
    name: 'GPT-4-32K',
    maxLength: 96000,
    tokenLimit: 32000
  }
};
