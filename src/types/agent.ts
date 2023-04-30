import { RoleTypes } from './roles';

export interface Agent {
  id: string;
  name: string;
  role: RoleTypes;
  goal: string;
  tasks: string[];
}
