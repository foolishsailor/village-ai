import store from '@/store';
import { core } from '@/agents/prompts';
import { actionNames } from '@/agents/actions';
import { RoleTypes } from '@/types/roles';
import { messageBus } from '@/services/message-bus';
import { Message } from '@/types/message';
import { createChatCompletion } from '@/services/api/openai';
import { chromaDB } from '@/services/vectorDB/chroma-db-service';
import {
  agentMessageBuilder,
  MessageBuilder
} from '@/agents/agent-message-builder';
import { addAgents } from '@/store/applicationSlice';
import { processAIResponse } from './process-ai-response';
import { logger } from '@/services/logger';
import { OpenAIMessageRequestProps } from '@/types/openai';
import { Collection } from 'chromadb';
import { GetEmbeddingIncludeEnum } from 'chromadb/dist/main/generated';

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
  memory!: Collection;
  initializeAgent: (goal: string) => OpenAIMessageRequestProps;
  buildMessage: ({
    message,
    prefix,
    messages
  }: MessageBuilder) => OpenAIMessageRequestProps;

  constructor({ name, role, goal }: AgentProps) {
    const {
      application: { numberOfAgents }
    } = store.getState();

    const { initializeAgent, buildMessage } = agentMessageBuilder(role, name);

    this.initializeAgent = initializeAgent;
    this.buildMessage = buildMessage;
    this.agentID = `${name}_${(numberOfAgents + 1).toString()}`.toLowerCase();
    this.agentName = name;
    this.agentGoal = goal;

    (async () => {
      this.memory = await chromaDB.createCollection(
        `${name}_${(numberOfAgents + 1).toString()}`.toLowerCase()
      );
    })();

    messageBus.subscribe(this.messageListener.bind(this));

    this.initAgent();
  }

  async initAgent() {
    //add agent to list
    addAgents([this.agentID]);

    //create memory collection

    //initialize agetns goals and action their first response
    processAIResponse(
      this.agentID,
      await createChatCompletion(this.initializeAgent(this.agentGoal))
    );
  }

  async sendMessageToAI(message: string) {
    const newAImessage = this.buildMessage({ message });

    const addMemory = await chromaDB.addDataToCollection(this.agentID, {
      type: 'command',
      content: JSON.stringify(newAImessage)
    });

    const memories = await this.memory.get(
      undefined,
      {
        $or: [
          {
            type: {
              $eq: 'choice'
            }
          },
          {
            type: {
              $eq: 'command'
            }
          }
        ]
      },
      undefined,
      undefined,
      [GetEmbeddingIncludeEnum.Documents]
    );

    logger.debug(
      'Agent',
      'sendMessageToAI',
      `memories: ${JSON.stringify(memories.documents.reverse())}`
    );

    processAIResponse(
      this.agentID,
      await createChatCompletion(
        this.buildMessage({
          messages: JSON.parse(memories.documents).reverse()
        })
      )
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
        case 'agent':
          break;
        case 'update':
          break;
        case 'random':
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
