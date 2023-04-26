export const search = {
  searchWeb: {
    description: 'Search the web for information',
    parameters: {
      query: {
        description: 'The query to search the web for'
      }
    },
    execute: () => {
      /*
      check if query is a string - if invalid query then return suggestion to look up help  
      if invalid parameters then return suggestion to look up help
      */
    }
  },
  searchMemory: {
    description: 'Search the memory store for information',
    parameters: {
      agentId: {
        description: 'The ID of the agents memory store to search'
      },
      query: {
        description: 'The query to search the memory store for'
      }
    },
    execute: () => {
      /*
      check if agent exists - if invalid agent then return suggestion to look up agents
      check if query is a string - if invalid query then return suggestion to look up help  
      if invalid parameters then return suggestion to look up help
      */
    }
  }
};
