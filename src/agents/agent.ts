import store from '@/store';
import { core } from '@/agents/prompts';
import { actionNames } from '@/agents/actions';
import { RoleTypes } from '@/types/roles';
import { messageBus } from '@/services/message-bus';
import { Message } from '@/types/message';

export type Agent = {
  name: string;
  role: RoleTypes;
};

export const agent = ({ name, role }: Agent) => {
  const {
    application: { numberOfAgents }
  } = store.getState();

  const agentID = (numberOfAgents + 1).toString();
  const identityPrompt = core.identity(name);
  const rolePrompt = core.role(role);
  const corePrompt = core.core(actionNames, role, name);

  const agentGoal = '';
  const agentTasks: string[] = [];

  const messageListener = (message: Message) => {
    if (message.destination.includes(agentID)) {
      // save memory to vector
    }
  };

  messageBus.subscribe(messageListener);

  /*
Ok so need the follooing:

1. Save messages to memory
2. Get messages from memory and reflect on them
3. Check context size and summarize regualalry
4. Make decision on reflection
5. parse decision repons from oai into action
6. execute action
7. repeat

notes: there are several recursion types - response to message, response to action, response to reflection, response to decision, response to action execution, re

identify hwo to best handle a tiomes or scheduled action??
identify how best to handle message

BIG Questions:  

There are role specific tasks should ALL tasks be available to all agents?  
How to handle tasks that are desinged to keep agents on rails like the Fool and the Manager?
  scheduled checkups of tasks compeltion?
  looking at other agent memories to see if endless loops?
  do we need default message types to seed the response agents should use for things liek "Get back on track Agetn X you are in a loop"
  and lastly how do we organize ability for agents to ask for help of other agents based on type


*/

  return {
    deleteAgent: () => {
      // delete agent
      messageBus.unsubscribe(messageListener);
    }
  };
};
