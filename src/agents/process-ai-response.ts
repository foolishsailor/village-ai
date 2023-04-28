import { logger } from '@/services/logger';
import { messageBus } from '@/services/message-bus';
import { chromaDB } from '@/services/vectorDB/chroma-db-service';
import { OpenAIApiResponse } from '@/types/openai';
import { parseMessage } from '@/utils/parse-message';

export const processAIResponse = async (
  agentId: string,
  agentResponse: OpenAIApiResponse
): Promise<void> => {
  logger.debug(
    'take-action',
    'takeAction',
    `agent response: ${JSON.stringify(agentResponse)}`
  );

  const collection = await chromaDB.getCollection(agentId);

  const lastMessage = agentResponse.choices[0].message.content;

  const addMemory = await chromaDB.addDataToCollection(agentId, {
    types: [{ DocumentType: 'OpenAi' }, { MessageType: 'message' }],
    content: JSON.stringify(agentResponse.choices[0])
  });

  const memories = await collection?.get();

  console.log('getMemory', memories);

  //start decision response cycle
  const parsedMessage = parseMessage(lastMessage);

  logger.info(
    'take-action',
    'takeAction',
    `parseMessage: ${JSON.stringify(parsedMessage)}`
  );

  switch (parsedMessage.type) {
    case 'error':
      parsedMessage.message &&
        messageBus.send({
          type: 'error',
          sourceType: 'control',
          destination: [agentId],
          content: parsedMessage.message
        });
      break;
    case 'action':
      break;
    case 'decision':
      break;
  }
};
