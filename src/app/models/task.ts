// task.model.ts

export interface Task {
  id?: number;
  title: string;
  description?: string;
  dueDate?: Date;
  taskType?: string; // Puedes definir el tipo según tus necesidades
  completed?: boolean;
  enable?: boolean;
}
