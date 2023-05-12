import chalk from 'chalk';
import { Tool } from 'langchain/tools';

export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed';

export type TaskType = {
  name: string;
  status: TaskStatus;
};

export class TaskManager extends Tool {
  name: string;
  description: string;
  tasks: TaskType[];

  constructor() {
    super();
    this.name = 'Task Manager';
    this.tasks = [];
    this.description = `Create, Edit and Update tasks that can be executed.  These tasks are used to help break large problems down into smaller problems.

    The action for this task is: Task Manager

    The action input options are listed below
    CreateTask:<Task>
    UpdateTask:<Task>|<Status>
    DeleteTask:<Task>

    Status: Not Started, In Progress, Completed.

    Examples:

    CreateTask:Research Everest height
    UpdateTask:Research Everest height|Completed
    DeleteTask:Research Everest height

    MistakesAvoid:

    Spaces in function names or missing colon.
    No pipe between status and task.
    Inaccurate task description.
 `;
  }

  async CreateTask(input: string) {
    console.log('TaskManager.CreateTask', chalk.magenta(input));
    this.tasks.push({ name: input, status: 'Not Started' });
  }

  async UpdateTask(input: string, status: TaskStatus) {
    const task = this.tasks.find((t) => t.name === input);
    if (task) task.status = status;
  }

  async DeleteTask(input: string) {
    const index = this.tasks.findIndex((t) => t.name === input);
    if (index >= 0) this.tasks.splice(index, 1);
  }

  async _call(input: string) {
    console.log('TaskManager._call', chalk.magenta(input));
    try {
      if (!input) throw new Error('Task input cannot be empty.');

      const [command, ...args] = input.split(':');

      if (!command) throw new Error('Command cannot be empty.');

      if (args.length === 0) throw new Error('Arguments cannot be empty.');

      const [task, status] = args.join(':').split('|');

      if (!task) throw new Error('Task cannot be empty.');

      if (command === 'UpdateTask' && !status)
        throw new Error('Status cannot be empty for UpdateTask command.');

      switch (command) {
        case 'CreateTask':
          await this.CreateTask(task);
          break;
        case 'UpdateTask':
          await this.UpdateTask(task, status as TaskStatus);
          break;
        case 'DeleteTask':
          await this.DeleteTask(task);
          break;
        default:
          throw new Error(`Unknown command: ${command}`);
      }
      return `Tasks:\n\n${this.tasks
        .map((task) => `- Task: "${task.name}"\n  Status: ${task.status}`)
        .join('\n\n')}`;
    } catch (error: any) {
      return error.message;
    }
  }
}
