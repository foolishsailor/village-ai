export const memory = {
  addMemory: {
    description: 'Add a new memory to the memoryStore',
    parameters: {
      agentId: {
        description: 'The ID of the agents memory store to add memory to'
      },
      memory: {
        description: 'The memory to add to the memory store'
      }
    },
    execute: () => {
      /*
      check if agent exists - if invalid agent then return suggestion to look up agents
      check if memory is a string - if invalid memory then return suggestion to look up help
     if invalid parameters then return suggestion to look up help
      */
    }
  },
  removeMemory: {
    description: 'Remove a memory from the memoryStore',
    parameters: {
      agentId: {
        description: 'The ID of the agents memory store to remove memory from'
      },
      memory: {
        description: 'The memory to remove from the memory store'
      }
    },
    execute: () => {
      /*
      check if agent exists - if invalid agent then return suggestion to look up agents
      check if memory is a string - if invalid memory then return suggestion to look up help
      if invalid parameters then return suggestion to look up help
      */
    }
  },
  getMemory: {
    description: 'Get a memory from the memoryStore',
    parameters: {
      agentId: {
        description: 'The ID of the agents memory store to get memory from'
      },
      memoryId: {
        description: 'The ID of the memory to get from the memory store'
      }
    },
    execute: () => {
      /*
      check if agent exists - if invalid agent then return suggestion to look up agents
      check if memory exists - if invalid memory then return suggestion to look up help
      if invalid parameters then return suggestion to look up help
      */
    }
  }
};
