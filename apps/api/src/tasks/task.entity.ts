import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dto/create-task.dto';

export class Task {
  constructor(data: CreateTaskDto) {
    this.id = randomUUID();
    this.title = data.title;
    this.description = data.description;
    this.dueDate = data.dueDate;
    this.completed = data.completed ?? false;
  }

  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
}
