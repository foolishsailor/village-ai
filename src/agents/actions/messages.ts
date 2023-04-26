export const messaging = {
  sendMessage: {
    description: 'Send a message to another agent',
    parameters: {
      targetAgentId: {
        description:
          "The target agent's ID.  Can be multiple Ids separated by commas. in this format [agent1, agent2, agent3]]"
      },
      message: {
        description: 'The content of the message'
      }
    },
    execute: () => {
      /*
      check if sending to self - then suggest write note

      if invalid agent then reutrn suggestion to look up agents

      if invalid parameters then return suggestion to look up help
      */
    }
  }
};
