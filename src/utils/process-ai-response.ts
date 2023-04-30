import { messageBus } from '@/services/message-bus';
import { chromaDB } from '@/services/vectorDB/chroma-db-service';
import { MessageType } from '@/types/message';
import { OpenAIApiResponse } from '@/types/openai';
import { parseMessageToAction } from '@/utils/parse-message';

/**
 * Processes the response received from the OpenAI API and sends any necessary messages to the message bus.
 * @param {string} agentId - The ID of the agent that sent the message.
 * @param {OpenAIApiResponse} agentResponse - The response received from the OpenAI API.
 */
export const processAIResponse = async (
  agentId: string,
  agentResponse: OpenAIApiResponse
): Promise<void> => {
  const collection = await chromaDB.getCollection(agentId);

  const lastMessage = agentResponse.choices[0].message.content;

  messageBus.send({
    type: MessageType.Message,
    content: {
      type: 'response',
      sourceType: 'agent',
      source: agentId,
      destination: ['control'],
      content: lastMessage
    }
  });

  if (collection)
    await chromaDB.addMemoriesToCollection(collection, {
      types: [{ DocumentType: 'OpenAi', MessageType: 'assistant' }],
      content: [lastMessage]
    });

  const parsedMessage = parseMessageToAction(lastMessage);

  switch (parsedMessage.type) {
    case 'error':
      parsedMessage.message &&
        messageBus.send({
          type: MessageType.Message,
          content: {
            type: 'error',
            sourceType: 'system',
            destination: [agentId],
            content: parsedMessage.message
          }
        });
      break;
    case 'action':
      break;
    case 'decision':
      break;
  }
};
