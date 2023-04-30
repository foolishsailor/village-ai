/**
    
    Enumeration representing the available command actions.
    @typedef {object} CommandActions
    @property {string} Start - Start the system.
    @property {string} Stop - Stop the system.
    @property {string} AddAgent - Add an agent to the system.
    @property {string} RemoveAgent - Remove an agent from the system.
    @property {string} StopAgent - Stop an agent.
    @property {string} StartAgent - Start an agent.
    @property {string} ChangeAgentType - Change the type of an agent.
    @property {string} ChangeAgentName - Change the name of an agent.
*/
export enum CommandActions {
  Start = 'start',
  Stop = 'stop',
  AddAgent = 'addAgent',
  RemoveAgent = 'removeAgent',
  StopAgent = 'stopAgent',
  StartAgent = 'startAgent',
  ChangeAgentType = 'changeAgentType',
  ChangeAgentName = 'changeAgentName'
}

/**

    Type definition for mapping command actions to their respective messages.
    @typedef {object} CommandActionToMessage
    @property {object} Start - Start action with content set to null.
    @property {object} Stop - Stop action with content set to null.
    @property {object} AddAgent - AddAgent action with content containing id, name, and type.
    @property {object} RemoveAgent - RemoveAgent action with content containing id.
    @property {object} StopAgent - StopAgent action with content containing id.
    @property {object} StartAgent - StartAgent action with content containing id.
    @property {object} ChangeAgentType - ChangeAgentType action with content containing id and type.
    @property {object} ChangeAgentName - ChangeAgentName action with content containing id and name.
    */
export type CommandActionToMessage = {
  [CommandActions.Start]: {
    action: CommandActions.Start;
    content: null;
  };
  [CommandActions.Stop]: { action: CommandActions.Stop; content: null };
  [CommandActions.AddAgent]: {
    action: CommandActions.AddAgent;
    content: { id: string; name?: string; type?: string };
  };
  [CommandActions.RemoveAgent]: {
    action: CommandActions.RemoveAgent;
    content: { id: string };
  };
  [CommandActions.StopAgent]: {
    action: CommandActions.StopAgent;
    content: { id: string };
  };
  [CommandActions.StartAgent]: {
    action: CommandActions.StartAgent;
    content: { id: string };
  };
  [CommandActions.ChangeAgentType]: {
    action: CommandActions.ChangeAgentType;
    content: { id: string; type: string };
  };
  [CommandActions.ChangeAgentName]: {
    action: CommandActions.ChangeAgentName;
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
  startSystem: () => void;
  stopSystem: () => void;
  addAgent: (content: { id: string; name?: string; type?: string }) => void;
  removeAgent: (content: { id: string }) => void;
  stopAgent: (content: { id: string }) => void;
  startAgent: (content: { id: string }) => void;
  changeAgentType: (content: { id: string; type: string }) => void;
  changeAgentName: (content: { id: string; name: string }) => void;
};
