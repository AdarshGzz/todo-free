export interface Task {
  id: string;
  content: string;
  completed: boolean;
}

export interface Page {
  id: string;
  name: string;
  tasks: Task[];
}
