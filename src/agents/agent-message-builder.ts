import { OpenAIMessage, OpenAIMessageRequestProps } from '@/types/openai';
import { RoleTypes } from '@/types/roles';
import { actionNames } from './actions';
import { core } from './prompts';
import { ChromaMemory } from '@/types/memory';

export interface MessageBuilder {
  message?: string;
  messages?: OpenAIMessage[];
  prefix?: string;
}

export const agentMessageBuilder = (roleType: RoleTypes, agentName: string) => {
  const role = core.role(roleType);
  const name = agentName;

  return {
    initializeAgent: (goal: string): OpenAIMessageRequestProps => {
      const identityPrompt = core.identity(name).prompt;
      const rolePrompt = role.prompt;
      const corePrompt = core.core(actionNames, roleType, name).prompt;

      return {
        systemPrompt: `${identityPrompt} ${rolePrompt} ${corePrompt}`,
        messages: [
          {
            role: 'user',
            content: goal
          }
        ],
        temperature: role.temperature
      };
    },
    buildMessage: ({
      message,
      messages = [],
      prefix
    }: MessageBuilder): OpenAIMessageRequestProps => {
      return {
        systemPrompt: '',
        messages: message
          ? [
              ...messages,
              {
                role: 'user',
                content: prefix ? `${prefix} ${message}` : message
              }
            ]
          : [...messages],
        temperature: role.temperature
      };
    },
    processMemoriesIntoOpenAImessages: (
      memories: ChromaMemory
    ): OpenAIMessage[] => {
      return memories.documents.map((document, i) => {
        return {
          role: memories.metadatas ? memories.metadatas[i].MessageType : '',
          content: document
        };
      });
    }
  };
};
