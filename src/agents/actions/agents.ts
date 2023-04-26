export const agents = {
  addAgent: {
    description: 'Add a new agent to the system',
    parameters: {
      agentId: {
        description: 'The ID of the agent to add'
      },
      agentRole: {
        description: 'The role of the agent to add'
      }
    },
    execute: () => {
      /*
      check if agent already exists - then suggest either a new name, look up agents or remove agent

      if invalid agent then return suggestion to look up agents
      if invalid role then return suggestion to look up roles

      if invalid parameters then return suggestion to look up help

      Make sure to communicate who added agent and the agents name, role etc to all agents

      */
    }
  },
  removeAgent: {
    description: 'Remove an agent from the system',
    parameters: {
      agentId: {
        description: 'The ID of the agent to remove'
      }
    },
    execute: () => {
      /*
      check if agent exists -

      if invalid agent then return suggestion to look up agents

      if invalid parameters then return suggestion to look up help

      Make sure to communicate who removed agent and the agents name, role etc to all agents

      */
    }
  },
  getAgents: {
    description: 'Get a list of all agents in the system',
    execute: () => {
      /*
      return list of agents
      */
    }
  }
};
