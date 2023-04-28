import store from '@/store';
import { core } from '@/agents/prompts';
import { actionNames } from '@/agents/actions';
import { RoleTypes } from '@/types/roles';
import { messageBus } from '@/services/message-bus';
import { Message } from '@/types/message';
import { createChatCompletion } from '@/services/api/openai';
import { chromaDB } from '@/services/vectorDB/chroma-db-service';
import { agentMessageBuilder } from '@/agents/agent-message-builder';
import { addAgents } from '@/store/applicationSlice';
import { processAIResponse } from './process-ai-response';
import { logger } from '@/services/logger';
import { OpenAIMessageRequestProps } from '@/types/openai';

export type AgentProps = {
  name: string;
  role: RoleTypes;
  goal: string;
};

export class Agent {
  agentID: string;
  agentName: string;
  agentGoal: string;
  agentTasks: string[] = [];

  constructor({ name, role, goal }: AgentProps) {
    const {
      application: { numberOfAgents }
    } = store.getState();

    this.agentID = `${name}_${(numberOfAgents + 1).toString()}`.toLowerCase();
    this.agentName = name;
    this.agentGoal = goal;

    const { initializeAgent, buildMessage } = agentMessageBuilder(role, name);

    messageBus.subscribe(this.messageListener.bind(this));

    this.initAgent(initializeAgent, buildMessage);
  }

  async initAgent(
    initializeAgent: (goal: string) => OpenAIMessageRequestProps,
    buildMessage: (
      message: string,
      prefix?: string | undefined
    ) => OpenAIMessageRequestProps
  ) {
    //add agent to list
    addAgents([this.agentID]);

    //create memory collection
    await chromaDB.createCollection(this.agentID);

    //initialize agetns goals and action their first response
    processAIResponse(
      this.agentID,
      await createChatCompletion(initializeAgent(this.agentGoal))
    );
  }

  async sendMessageToAI(message: string) {
    //initialize agents goals and action their first response
    const { buildMessage } = agentMessageBuilder(
      this.agentName,
      this.agentRole
    );
    processAIResponse(
      this.agentID,
      await createChatCompletion(buildMessage(message))
    );
  }

  // Other methods like addTask, removeTask, etc.

  messageListener(message: Message) {
    if (message.destination.includes(this.agentID)) {
      logger.info(
        'agent',
        'messageListener',
        `message: ${JSON.stringify(message)}`
      );

      switch (message.type) {
        case 'error':
          this.sendMessageToAI(message.content);
          break;
        case 'action':
          break;
        case 'decision':
          break;
      }
    }
  }

  addTask() {}
  removeTask() {}
  updateTask() {}
  addUpdateGoal() {}
  getAgentIdentity() {}
  act() {}

  deleteAgent() {
    // delete agent
    messageBus.unsubscribe(this.messageListener.bind(this));
  }
}
