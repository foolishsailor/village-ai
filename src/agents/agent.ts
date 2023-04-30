import store from '@/store';
import { RoleTypes } from '@/types/roles';
import { messageBus } from '@/services/message-bus';
import { CommsMessage, Message, MessageType } from '@/types/message';
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
import { parseMemoriestoMessages } from '@/utils/parse-message';

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

      this.initAgent();
    })();

    messageBus.subscribe(this.messageListener.bind(this));
  }

  async initAgent() {
    //add agent to list
    addAgents([this.agentID]);

    const initialiPrompt = this.initializeAgent(this.agentGoal);

    await chromaDB.addMemoriesToCollection(this.memory, {
      types: [
        { DocumentType: 'OpenAi', MessageType: 'system' },
        { DocumentType: 'OpenAi', MessageType: 'user' }
      ],
      content: [initialiPrompt.systemPrompt, initialiPrompt.messages[0].content]
    });

    //initialize agetns goals and action their first response
    processAIResponse(this.agentID, await createChatCompletion(initialiPrompt));
  }

  async sendMessageToAI(message: string) {
    await chromaDB.addMemoriesToCollection(this.memory, {
      types: [{ DocumentType: 'OpenAi', MessageType: 'user' }],
      content: [message]
    });

    const memories = await this.memory.get(undefined, {
      DocumentType: {
        $eq: 'OpenAi'
      }
    });

    processAIResponse(
      this.agentID,
      await createChatCompletion(
        this.buildMessage({
          messages: parseMemoriestoMessages(memories)
        })
      )
    );
  }

  // Other methods like addTask, removeTask, etc.

  messageListener(message: Message) {
    if (message.type === MessageType.Message) {
      const { content } = message;

      if (content.destination.includes(this.agentID)) {
        switch (content.type) {
          case 'error':
            this.sendMessageToAI(content.content);
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
