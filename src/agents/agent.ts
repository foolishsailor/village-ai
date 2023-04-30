import store from '@/store';
import { RoleTypes } from '@/types/roles';
import { messageBus } from '@/services/message-bus';
import { Message, MessageType } from '@/types/message';
import { createChatCompletion } from '@/services/api/openai';
import { chromaDB } from '@/services/vectorDB/chroma-db-service';
import {
  agentMessageBuilder,
  MessageBuilder
} from '@/agents/agent-message-builder';
import { addAgents } from '@/store/applicationSlice';
import { processAIResponse } from '@/utils/process-ai-response';
import { OpenAIMessageRequestProps } from '@/types/openai';
import { Collection } from 'chromadb';
import { parseMemoriestoMessages } from '@/utils/parse-message';
import { TaskQueueManager } from '@/services/tasks';

export type AgentProps = {
  name: string;
  role: RoleTypes;
  goal: string;
};

export class Agent {
  id: string;
  name: string;
  goal: string;
  role: RoleTypes;
  tasks: string[] = [];
  memory!: Collection;
  initializeAgent: (goal: string) => OpenAIMessageRequestProps;
  buildMessage: ({
    message,
    prefix,
    messages
  }: MessageBuilder) => OpenAIMessageRequestProps;
  taskQueueManager: TaskQueueManager;

  constructor({ name, role, goal }: AgentProps) {
    const {
      application: { agents }
    } = store.getState();

    const { initializeAgent, buildMessage } = agentMessageBuilder(role, name);

    this.initializeAgent = initializeAgent;
    this.buildMessage = buildMessage;
    this.id = `${name}_${(agents.length + 1).toString()}`.toLowerCase();
    this.name = name;
    this.goal = goal;
    this.role = role;
    this.taskQueueManager = new TaskQueueManager(
      this.messageProcessor.bind(this)
    );

    messageBus.subscribe(this.messageListener.bind(this));

    this.taskQueueManager.start();

    (async () => {
      this.memory = await chromaDB.createCollection(
        `${name}_${(agents.length + 1).toString()}`.toLowerCase()
      );

      this.initAgent();
    })();
  }

  private async initAgent() {
    store.dispatch(
      addAgents([
        {
          id: this.id,
          name: this.name,
          role: this.role,
          goal: this.goal,
          tasks: this.tasks
        }
      ])
    );

    const initialPrompt = this.initializeAgent(this.goal);

    await chromaDB.addMemoriesToCollection(this.memory, {
      types: [
        { DocumentType: 'OpenAi', MessageType: 'system' },
        { DocumentType: 'OpenAi', MessageType: 'user' }
      ],
      content: [initialPrompt.systemPrompt, initialPrompt.messages[0].content]
    });

    //initialize agetns goals and action their first response
    processAIResponse(this.id, await createChatCompletion(initialPrompt));
  }

  /**
   * Sends a message to the AI and processes its response.
   * @param {string} message - The message to send to the AI.
   */
  private async sendMessageToAI(message: string) {
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
      this.id,
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
      this.taskQueueManager.push(message);

      console.log(
        'message listyener  this.messageQueue===============',
        this.taskQueueManager.tasks.length
      );
    }
  }

  messageProcessor(message: Message): () => Promise<void> {
    console.log(
      'this.taskQueueManager====================',
      this.taskQueueManager
    );

    return async (): Promise<void> => {
      return new Promise((resolve) => {
        const {
          application: { isRunning }
        } = store.getState();

        if (message.type === MessageType.Message) {
          const { content } = message;

          if (content.destination.includes(this.id)) {
            switch (content.type) {
              case 'error':
                this.sendMessageToAI(content.content);
                break;
              case 'action':
                break;
              case 'decision':
                break;
            }
          }
        }
        resolve();
      });
    };
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
