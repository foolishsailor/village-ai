export const core = {
  noop: {
    description: 'Do nothing',
    execute: () => {}
  },

  help: {
    description: 'Get help on a specific action and the parameters it expects.',
    parameters: {
      aboutAction: {
        description: 'The name of an action to get help on'
      }
    },
    execute: () => {
      /*
      check if action exists - if invalid action then return suggestion to look up actions
      if invalid parameters then return suggestion to look up help
      */
    }
  }
};
