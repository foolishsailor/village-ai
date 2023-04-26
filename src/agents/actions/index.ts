import * as agents from './agents';
import * as core from './core';
import * as file from './file';
import * as search from './search';
import * as messages from './messages';
import * as memory from './memory';

export const actions = Object.values({
  ...agents,
  ...core,
  ...file,
  ...search,
  ...messages,
  ...memory
}).reduce((acc, cur) => Object.assign(acc, cur), {});

export const actionNames = Object.keys(actions).join(', ');
