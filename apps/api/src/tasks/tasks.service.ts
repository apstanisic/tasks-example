import { NotFoundException } from '@nestjs/common';
import { randomInt } from 'crypto';
import { times } from 'lodash';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

export class TasksService {
  /**
   * In memory state
   */
  private state = new Map<string, Task>();

  constructor() {
    // mock data
    times(10, (i) => {
      const task = new Task({
        title: 'Hello World ' + (i + 1),
        completed: randomInt(3) === 1,
        description: 'This is description',
      });

      this.state.set(task.id, task);
    });
  }

  async getMany(page = 1) {
    const perPage = 5;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    const data: Task[] = [];
    const total = this.state.size;
    const pages = Math.ceil(this.state.size / perPage);

    const nextPage = page < pages ? page + 1 : null;
    const prevPage = page === 1 ? null : page - 1;

    const hasNextPage = nextPage !== null;
    const hasPrevPage = prevPage !== null;

    let item = 0;
    for (const task of this.state.values()) {
      if (item >= start && item < end) {
        data.push(task);
      }
      if (item > end) break;
      item++;
    }

    return { data, total, pages, nextPage, prevPage, hasNextPage, hasPrevPage };
  }

  async getById(id: string) {
    const task = this.state.get(id);
    if (!task) throw new NotFoundException();
    return task;
  }

  async create(data: CreateTaskDto) {
    const task = new Task(data);
    this.state.set(task.id, task);
    return task;
  }

  async updateById(id: string, data: UpdateTaskDto) {
    const task = this.state.get(id);
    if (!task) throw new NotFoundException();
    const updatedTask = { ...task, ...data };
    this.state.set(id, updatedTask);
    return updatedTask;
  }

  async deleteById(id: string) {
    const task = this.state.get(id);
    if (!task) throw new NotFoundException();
    this.state.delete(id);
    return task;
  }
}
