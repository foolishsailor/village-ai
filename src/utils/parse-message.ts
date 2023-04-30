import { error } from '@/agents/prompts/error-response';
import { CODE_BLOCK_DELIMITER, MULTILINE_DELIMITER } from '@/config/defaults';
import { ChromaMemory } from '@/types/memory';
import { MessageType, ParsedMessageType } from '@/types/message';
import { OpenAIMessage } from '@/types/openai';

type Action = {
  action: string;
  properties: { [key: string]: string };
};

interface ActionsData {
  [key: string]: string[];
}

const actionsData: ActionsData = {
  addAgent: ['name', 'skills'],
  sendMessage: ['to', 'message']
};

//----------------------------------------------
type ParsedMessage = {
  type: ParsedMessageType;
  message?: string;
  thoughts?: string;
  actions?: Action[];
};

export function parseMessageToAction(content: string): ParsedMessage {
  const delimiter = new RegExp(CODE_BLOCK_DELIMITER, 'g');
  const multilineDelimiter = new RegExp(MULTILINE_DELIMITER, 'g');

  // Get data between delimiters
  const data =
    content.match(
      new RegExp(`${delimiter.source}([\\s\\S]*?)${delimiter.source}`)
    )?.[1] || '';

  if (!data) {
    return {
      type: 'error',
      message: error.noTextFound
    };
  }

  // Replace multiline delimiter with a special symbol
  const replacedData = data.replace(
    multilineDelimiter,
    '||MULTILINE_DELIMITER||'
  );

  // Split lines
  const lines = replacedData.split(/\n/);

  const parsedData: ParsedMessage = {
    type: 'action',
    thoughts: '',
    actions: []
  };

  let currentAction: Action | null = null;

  for (const line of lines) {
    // Thoughts
    if (line.startsWith('thoughts:')) {
      parsedData.thoughts = line.replace('thoughts:', '').trim();
    }
    // Actions
    else if (Object.prototype.hasOwnProperty.call(actionsData, line.trim())) {
      if (currentAction) {
        parsedData.actions && parsedData.actions.push(currentAction);
      }
      currentAction = {
        action: line.trim(),
        properties: {}
      };
    }
    // Action properties
    else if (currentAction && line.includes(':')) {
      const [property, value] = line.split(':').map((part) => part.trim());
      if (actionsData[currentAction.action].includes(property)) {
        currentAction.properties[property] = value.replace(
          '||MULTILINE_DELIMITER||',
          multilineDelimiter.source
        );
      }
    }
  }

  // Push the last action
  if (currentAction) {
    parsedData.actions && parsedData.actions.push(currentAction);
  }

  return parsedData;
}

export const parseMemoriestoMessages = (
  memories: ChromaMemory
): OpenAIMessage[] => {
  const retreivedMemories = memories.documents.map((document, i) => {
    return {
      role: memories.metadatas ? memories.metadatas[i].MessageType : '',
      content: document,
      id: memories.ids[i]
    };
  });

  retreivedMemories.sort((a, b) => {
    // Use a localeCompare() method to compare the string values of the id property as numbers
    return a.id.localeCompare(b.id, undefined, { numeric: true });
  });

  return retreivedMemories.map(({ role, content }) => ({ role, content }));
};
