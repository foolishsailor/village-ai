/*

    USAGE

    // Initialize the appState object
    const appState: AppState = {
      agents: [],
      numberOfAgents: 1,
      modelType: "gpt-3.5-turbo",
    };

    // Create an InMemoryStore instance
    const memoryStore = new InMemoryStore<AppState>();

    // Initialize the memoryStore with the appState object
    memoryStore.init({ appState });

    // Subscribe to updates for the "appState" key
    memoryStore.subscribe("appState", (value, key) => {
      console.log(`Updated value for key "${key}":`, value);
    });

    // Update the appState object
    const updatedAppState: AppState = {
      agents: [{ name: "Agent 1" }],
      numberOfAgents: 2,
      modelType: "gpt-3.5-turbo",
    };

    memoryStore.set("appState", updatedAppState);
*/

import { Store } from '@/interfaces/store.interface';

// AppState type definition
interface AppState {
  agents: any[];
  numberOfAgents: number;
  modelType: string;
}

type Callback<T> = (value: T, key: string) => void;

// Create an InMemoryStore class that implements the Store interface
export class InMemoryStore<T = string> implements Store<T> {
  private store: Map<string, T>;
  private subscribers: Map<string, Callback<T>[]>;

  constructor() {
    // Create an in-memory store using a Map
    this.store = new Map<string, T>();
    // Initialize the subscribers map
    this.subscribers = new Map<string, Callback<T>[]>();
  }

  init(initialState: Record<string, T>): void {
    for (const key in initialState) {
      this.store.set(key, initialState[key]);
    }
  }

  get(key: string): T | undefined {
    // Get the value from the store
    const value = this.store.get(key);
    if (value === undefined) {
      return undefined;
    }
    return value;
  }

  set(key: string, value: T): void {
    // Set the value in the store
    this.store.set(key, value);
    // Publish the update to subscribers
    this.publish(key, value);
  }

  delete(key: string): boolean {
    // Delete the key from the store
    return this.store.delete(key);
  }

  getKeys(): string[] {
    // Get all the keys from the store
    const keys = Array.from(this.store.keys());
    return keys;
  }

  subscribe(key: string, callback: Callback<T>): void {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, []);
    }
    this.subscribers.get(key)?.push(callback);
  }

  unsubscribe(key: string, callback: Callback<T>): void {
    if (this.subscribers.has(key)) {
      const newSubscribers = this.subscribers
        .get(key)
        ?.filter((subscriber) => subscriber !== callback);
      this.subscribers.set(key, newSubscribers || []);
    }
  }

  private publish(key: string, value: T): void {
    if (this.subscribers.has(key)) {
      this.subscribers.get(key)?.forEach((callback) => {
        callback(value, key);
      });
    }
  }
}
