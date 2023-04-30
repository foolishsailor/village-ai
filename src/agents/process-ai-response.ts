import { messageBus } from '@/services/message-bus';
import { chromaDB } from '@/services/vectorDB/chroma-db-service';
import { MessageType } from '@/types/message';
import { OpenAIApiResponse } from '@/types/openai';
import { parseMessageToAction } from '@/utils/parse-message';

export const processAIResponse = async (
  agentId: string,
  agentResponse: OpenAIApiResponse
): Promise<void> => {
  const collection = await chromaDB.getCollection(agentId);

  const lastMessage = agentResponse.choices[0].message.content;

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
