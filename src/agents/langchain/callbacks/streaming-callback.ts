import { BaseCallbackHandler } from 'langchain/callbacks';
import chalk from 'chalk';
import {
  ChainValues,
  AgentAction,
  AgentFinish,
  LLMResult
} from 'langchain/schema';

class StreamingCallbackHandler extends BaseCallbackHandler {
  name = 'StreamingCallbackHandler';
  private static streamCallback?: (token: string) => void;

  static setStreamCallback(callback: (token: string) => void) {
    StreamingCallbackHandler.streamCallback = callback;
  }

  async handleChainStart(chain: { name: string }) {
    console.log(
      chalk.blue(
        `===== Entering new ${chalk.blue.bold(chain.name)} chain =====`
      )
    );
  }

  async handleChainEnd(output: ChainValues) {
    console.log(chalk.blue(`==== Finished chain ====`));
    console.log(output);
  }

  async handleLLMEnd(output: LLMResult) {
    //console.log(chalk.magenta(`==== LLM end ====`), output);
  }

  async handleAgentAction(action: AgentAction) {
    console.log(chalk.blue(`==== Agent Action ====`));
    console.log(`${chalk.blue.bold(`    Agent Tool:`)} ${action.tool}`);
    console.log(`${chalk.blue.bold(`   Agent Input:`)} ${action.toolInput}`);
    console.log(`${chalk.blue.bold(`     Agent Log:`)} ${action.log}`);
  }

  async handleToolEnd(output: string) {
    console.log(chalk.blue(`==== Tool End ====`));
    console.log(output);
  }

  async handleText(text: string) {
    console.log(chalk.dim(text));
  }

  async handleAgentEnd(action: AgentFinish) {
    console.log(chalk.blue(`==== Agent Action End ====`));
    console.log(
      `${chalk.blue.bold(` Agent Return Values:`)} ${JSON.stringify(
        action.returnValues,
        null,
        2
      )}`
    );
    console.log(`${chalk.blue.bold(`           Agent Log:`)} ${action.log}`);
  }

  async handleLLMNewToken(token: string) {
    StreamingCallbackHandler.streamCallback &&
      StreamingCallbackHandler.streamCallback(token);
  }
}

export { StreamingCallbackHandler };
