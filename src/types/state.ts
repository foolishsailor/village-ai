export type Stores = 'application' | 'agents';

export interface StateGetAction {
  action: 'get';
  store: Stores;
  properties?: string[];
}

export interface StateSetAction {
  action: 'set';
  store: Stores;
  properties: Record<string, unknown>;
}

export type StateActions = StateGetAction | StateSetAction;

export type StateGetMessage = {
  properties?: string[];
  result: Record<string, unknown>;
};

export type StateSetMessage = {
  result: Record<string, unknown>;
};

export type StateActionToMessage = {
  [K in StateActions['action']]: {
    content: StateActions extends { action: K }
      ? K extends 'get'
        ? StateGetMessage
        : StateSetMessage
      : never;
  };
};
