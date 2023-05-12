import { env } from '@/types/system';

import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { WebBrowser } from 'langchain/tools/webbrowser';
import { Calculator } from 'langchain/tools/calculator';
import { SearchWeb } from '@/agents/tools/search-web';
import { TaskManager } from '@/agents/tools/task-manager';
import { ConsoleCallback } from '@/agents/langchain/callbacks/console-callback';

const {
  OPENAI_API_KEY,
  GOOGLE_API_KEY,
  GOOGLE_SEARCH_ENGINE_ID,
  OPENAI_API_ORG_ID
} = env;

export const run = async () => {
  const model = new ChatOpenAI(
    { temperature: 0 },
    { apiKey: OPENAI_API_KEY, organization: OPENAI_API_ORG_ID }
  );
  const embeddings = new OpenAIEmbeddings();
  const tools = [
    new WebBrowser({ model, embeddings }),
    new SearchWeb(GOOGLE_API_KEY, GOOGLE_SEARCH_ENGINE_ID),
    new Calculator(),
    new TaskManager()
  ];

  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: 'chat-zero-shot-react-description'
  });
  console.log('Loaded agent.');

  const input = `Create a series of tasks that help calculate how much all the whales in the world weigh.  Make sure to identify at least 6 species weight as part of the process`;

  console.log(`Executing with input "${input}"...`);

  const result = await executor.call({ input }, [new ConsoleCallback()]);

  console.log(`Got output ${result.output}`);
};
