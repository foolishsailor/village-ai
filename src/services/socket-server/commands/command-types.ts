/**
    
    Enumeration representing the available command actions.
    @typedef {object} CommandActions
    @property {string} start - start the system.
    @property {string} stop - stop the system.
    @property {string} addAgent - add an agent to the system.
    @property {string} removeAgent - remove an agent from the system.
    @property {string} stopAgent - stop an agent.
    @property {string} startAgent - start an agent.
    @property {string} changeAgentType - change the type of an agent.
    @property {string} changeAgentName - change the name of an agent.
*/
export enum CommandActionsEnum {
  start = 'start',
  stop = 'stop',
  addAgent = 'addAgent',
  removeAgent = 'removeAgent',
  stopAgent = 'stopAgent',
  startAgent = 'startAgent',
  changeAgentType = 'changeAgentType',
  changeAgentName = 'changeAgentName'
}

/**

    Type definition for mapping command actions to their respective messages.
    @typedef {object} CommandActionToMessage
    @property {object} start - start action with content set to null.
    @property {object} stop - stop action with content set to null.
    @property {object} addAgent - addAgent action with content containing id, name, and type.
    @property {object} removeAgent - removeAgent action with content containing id.
    @property {object} stopAgent - stopAgent action with content containing id.
    @property {object} startAgent - startAgent action with content containing id.
    @property {object} changeAgentType - changeAgentType action with content containing id and type.
    @property {object} changeAgentName - changeAgentName action with content containing id and name.
    */
export type CommandActionToMessage = {
  [CommandActionsEnum.start]: {
    action: CommandActionsEnum.start;
    content: null;
  };
  [CommandActionsEnum.stop]: { action: CommandActionsEnum.stop; content: null };
  [CommandActionsEnum.addAgent]: {
    action: CommandActionsEnum.addAgent;
    content: { id: string; name?: string; type?: string };
  };
  [CommandActionsEnum.removeAgent]: {
    action: CommandActionsEnum.removeAgent;
    content: { id: string };
  };
  [CommandActionsEnum.stopAgent]: {
    action: CommandActionsEnum.stopAgent;
    content: { id: string };
  };
  [CommandActionsEnum.startAgent]: {
    action: CommandActionsEnum.startAgent;
    content: { id: string };
  };
  [CommandActionsEnum.changeAgentType]: {
    action: CommandActionsEnum.changeAgentType;
    content: { id: string; type: string };
  };
  [CommandActionsEnum.changeAgentName]: {
    action: CommandActionsEnum.changeAgentName;
    content: { id: string; name: string };
  };
};

/**

    Type definition for command action functions.
    @typedef {object} CommandActionsType
    @property {function} startSystem - Function to start the system.
    @property {function} stopSystem - Function to stop the system.
    @property {function} addAgent - Function to add an agent.
    @property {function} removeAgent - Function to remove an agent.
    @property {function} stopAgent - Function to stop an agent.
    @property {function} startAgent - Function to start an agent.
    @property {function} changeAgentType - Function to change the agent type.
    @property {function} changeAgentName - Function to change the agent name.
    */
export type CommandActionsType = {
  start: () => void;
  stop: () => void;
  addAgent: (content: { id: string; name?: string; type?: string }) => void;
  removeAgent: (content: { id: string }) => void;
  stopAgent: (content: { id: string }) => void;
  startAgent: (content: { id: string }) => void;
  changeAgentType: (content: { id: string; type: string }) => void;
  changeAgentName: (content: { id: string; name: string }) => void;
};
