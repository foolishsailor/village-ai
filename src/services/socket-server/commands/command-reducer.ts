import {
  CommandActions,
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
    case CommandActions.Start:
      actions.startSystem();
      break;
    case CommandActions.Stop:
      actions.stopSystem();
      break;
    case CommandActions.AddAgent:
      actions.addAgent(message.content);
      break;
    case CommandActions.RemoveAgent:
      actions.removeAgent(message.content);
      break;
    case CommandActions.StopAgent:
      actions.stopAgent(message.content);
      break;
    case CommandActions.StartAgent:
      actions.startAgent(message.content);
      break;
    case CommandActions.ChangeAgentType:
      actions.changeAgentType(message.content);
      break;
    case CommandActions.ChangeAgentName:
      actions.changeAgentName(message.content);
      break;
    default:
      console.error('Invalid action:');
  }
};
