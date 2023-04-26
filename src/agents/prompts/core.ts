import { CODE_BLOCK_DELIMITER } from '@/config/defaults';

export const core = {
  identity: (name: string) => ({
    prompt: `You are ${name}.`
  }),
  responseStructure: (actions: string[]) => ({
    prompt: `You will respond using the role you were given.  You will think, act and speak like that role. Your responses should always be in the follwing format and never in any other format:

    ${CODE_BLOCK_DELIMITER}
    Thought: <you should always think about what you are doing and why>
    Action: the action you wish to take.  You have access to the following actions: ${actions.join(
      ', '
    )}
    <arg 1 name>: <prop1 value>
    <arg 2 name>: <prop2 value>
    ...
    ${CODE_BLOCK_DELIMITER}`
  })
};
