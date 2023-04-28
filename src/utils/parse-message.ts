import { error } from '@/agents/prompts/error-response';
import { CODE_BLOCK_DELIMITER, MULTILINE_DELIMITER } from '@/config/defaults';
import { MessageType, ParsedMessageType } from '@/types/message';

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

export function parseMessage(content: string): ParsedMessage {
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
