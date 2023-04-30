import {
  CommandActionsEnum,
  CommandActionsType,
  CommandActionToMessage
} from './command-types';

export type CommandMessage =
  CommandActionToMessage[keyof CommandActionToMessage];

type ProcessMessageFunction = (
  message: CommandMessage,
  actions: CommandActionsType
) => void;

export const commandMessageReducer: ProcessMessageFunction = (
  message,
  actions
) => {
  switch (message.action) {
    case CommandActionsEnum.start:
      actions.start();
      break;
    case CommandActionsEnum.stop:
      actions.stop();
      break;
    case CommandActionsEnum.addAgent:
      actions.addAgent(message.content);
      break;
    case CommandActionsEnum.removeAgent:
      actions.removeAgent(message.content);
      break;
    case CommandActionsEnum.stopAgent:
      actions.stopAgent(message.content);
      break;
    case CommandActionsEnum.startAgent:
      actions.startAgent(message.content);
      break;
    case CommandActionsEnum.changeAgentType:
      actions.changeAgentType(message.content);
      break;
    case CommandActionsEnum.changeAgentName:
      actions.changeAgentName(message.content);
      break;
    default:
      console.error('Invalid action:');
  }
};
