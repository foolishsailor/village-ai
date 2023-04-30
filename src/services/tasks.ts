import { Message } from '@/types/message';

export class TaskQueueManager {
  public tasks: Message[] = [];
  private executeItem: (item: Message) => () => Promise<void>;
  private watcher?: NodeJS.Timer;
  private interval: number;

  constructor(
    executeItem: (item: Message) => () => Promise<void>,
    interval?: number
  ) {
    this.tasks = [];
    this.executeItem = executeItem;
    this.interval = interval || parseInt(process.env.TASKS_INTERVAL || '1000');
  }

  public start(): void {
    console.log('start tasks');
    this.watchArray();
  }

  public stop(): void {
    if (this.watcher) {
      clearTimeout(this.watcher);
      this.watcher = undefined;
    }
  }

  public push(item: Message): void {
    this.tasks.push(item);
  }

  public clearArray(): void {
    this.tasks = [];
  }

  private watchArray(): void {
    console.log('watch array ===========================', this.tasks);
    if (this.tasks.length === 0) {
      this.watcher = setInterval(() => {
        console.log('task array length', this.tasks.length);
        if (this.tasks.length > 0) {
          clearInterval(this.watcher);
          this.watchArray(); // Watch the array again if it's no longer empty
        }
      }, this.interval);
    } else {
      (async () => {
        console.log('executing task====================', this.tasks[0]);
        await this.executeItem(this.tasks[0])();
        console.log(`Finished executing ${this.tasks[0]}`);
        console.log('this.array====================', this.tasks);
        if (this.tasks.length > 0) this.tasks.shift();
        this.watchArray(); // Watch the array again if there are more items
      })();
    }
  }
}
