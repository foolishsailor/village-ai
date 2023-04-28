import { CODE_BLOCK_DELIMITER, MULTILINE_DELIMITER } from '@/config/defaults';

export const promptFormats = {
  defaultActionFormat: `${CODE_BLOCK_DELIMITER}
  thoughts: <you should always think about what you are doing and why>
  action: <the action you wish to take>
  <arg 1 name>: <prop1 value>
  <arg 2 name>: <prop2 value>
    ...
  ${CODE_BLOCK_DELIMITER}`,

  defaultActionCorrectExample: `${CODE_BLOCK_DELIMITER}
  thoughts: This seems important since it's fundamental to the way I communicate with the system.
  action: writeNote
  title: Always Remember
  content: Encode every response as an action!
  ${CODE_BLOCK_DELIMITER}`,

  defaultActionIncorrectExample: `${CODE_BLOCK_DELIMITER}
  Note to self: always encode every response as an action!
  ${CODE_BLOCK_DELIMITER}`,

  helpActionCorrectExample: `${CODE_BLOCK_DELIMITER}
  thoughts: I dont know how to use an action since its the first time so I am going to ask for help
  action: help
  aboutAction: writeNote
  ${CODE_BLOCK_DELIMITER}`,

  addMemoryMultilineCorrectExample: `${CODE_BLOCK_DELIMITER}
  thoughts: Im writing this note to myself so that I can remember to always encode every response as an action!
  action: addMemory
  title: Always Remember
  content:
  ${MULTILINE_DELIMITER}
  Encode
  every
  response
  as
  an
  action!
  ${MULTILINE_DELIMITER}
  ${CODE_BLOCK_DELIMITER}`
};
