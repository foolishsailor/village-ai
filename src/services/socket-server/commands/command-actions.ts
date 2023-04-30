import { Agent } from '@/agents/agent';
import store from '@/store';
import { setIsRunning } from '@/store/applicationSlice';

export const CommandActions = () => {
  return {
    start: (content: { id: string; name?: string; type?: string } | null) => {
      console.log('startSystem..........');
      store.dispatch(setIsRunning(true)); // Implement start system logic
      const manager = new Agent({
        name: 'Bob',
        role: 'Manager',
        goal: 'You need to build a team that can tell me how to build a house in california'
      });
    },

    stop: (content: { id: string; name?: string; type?: string } | null) => {
      console.log('stopSystem..........');
      store.dispatch(setIsRunning(false));
    },

    addAgent: (
      content: { id: string; name?: string; type?: string } | null
    ) => {
      // Implement add agent logic
    },

    removeAgent: (
      content: { id: string; name?: string; type?: string } | null
    ) => {
      // Implement remove agent logic
    },

    stopAgent: (
      content: { id: string; name?: string; type?: string } | null
    ) => {
      // Implement stop agent logic
    },

    startAgent: (
      content: { id: string; name?: string; type?: string } | null
    ) => {
      // Implement start agent logic
    },

    changeAgentType: (
      content: { id: string; name?: string; type?: string } | null
    ) => {
      // Implement change agent type logic
    },

    changeAgentName: (
      content: { id: string; name?: string; type?: string } | null
    ) => {
      // Implement change agent name logic
    }
  };
};
