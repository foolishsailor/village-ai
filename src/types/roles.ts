export type Role = {
  temperature: number;
  prompt: string;
};

export type RoleTypes =
  | 'Manager'
  | 'Researcher'
  | 'Engineer'
  | 'Teacher'
  | 'Communicator'
  | 'Fool';

export type Roles = {
  [K in RoleTypes]: Role;
};
