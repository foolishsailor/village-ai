import { OpenAIApiResponse, OpenAIMessageRequestProps } from '@/types/openai';

import {
  OPENAI_API_KEY,
  AZURE_DEPLOYMENT_ID,
  OPENAI_API_HOST,
  OPENAI_API_TYPE,
  OPENAI_API_VERSION,
  OPENAI_ORGANIZATION,
  DEFAULT_OPENAI_MODEL
} from '@/config/defaults';
import { logger } from '../logger';

export class OpenAIError extends Error {
  type: string;
  param: string;
  code: string;

  constructor(message: string, type: string, param: string, code: string) {
    super(message);
    this.name = 'OpenAIError';
    this.type = type;
    this.param = param;
    this.code = code;
  }
}

const url =
  OPENAI_API_TYPE === 'azure'
    ? `${OPENAI_API_HOST}/openai/deployments/${AZURE_DEPLOYMENT_ID}/chat/completions?api-version=${OPENAI_API_VERSION}`
    : `${OPENAI_API_HOST}/v1/chat/completions`;

export const createChatCompletion = async ({
  model,
  systemPrompt,
  temperature,
  key,
  tokens,
  messages
}: OpenAIMessageRequestProps): Promise<OpenAIApiResponse> => {
  logger.debug(
    'openai',
    'Request',
    `message: ${JSON.stringify(
      {
        model: model || DEFAULT_OPENAI_MODEL,
        messages: systemPrompt
          ? [
              {
                role: 'system',
                content: systemPrompt
              },
              ...messages
            ]
          : messages,
        max_tokens: tokens || 1000,
        temperature: temperature || 0.0,
        stream: false
      },
      undefined,
      2
    )}`
  );

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(OPENAI_API_TYPE === 'openai' && {
        Authorization: `Bearer ${key ? key : OPENAI_API_KEY}`
      }),
      ...(OPENAI_API_TYPE === 'azure' && {
        'api-key': `${key ? key : OPENAI_API_KEY}`
      }),
      ...(OPENAI_API_TYPE === 'openai' &&
        OPENAI_ORGANIZATION && {
          'OpenAI-Organization': OPENAI_ORGANIZATION
        })
    },
    method: 'POST',
    body: JSON.stringify({
      model: model || DEFAULT_OPENAI_MODEL,
      messages: systemPrompt
        ? [
            {
              role: 'system',
              content: systemPrompt
            },
            ...messages
          ]
        : messages,
      max_tokens: tokens || 1000,
      temperature: temperature || 0.9,
      stream: false
    })
  });

  if (res.status !== 200) {
    const result = await res.json();
    if (result.error) {
      throw new OpenAIError(
        result.error.message,
        result.error.type,
        result.error.param,
        result.error.code
      );
    } else {
      throw new Error(
        `OpenAI API returned an error: ${result?.value || result.statusText}`
      );
    }
  }

  const result = await res.json();
  console.log('result', result);

  logger.debug(
    'openai',
    'Response',
    `message: ${JSON.stringify(result, undefined, 2)}`
  );

  return result;
};
