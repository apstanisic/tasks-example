import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let app: TestingModule;
  let service: TasksService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();
    service = app.get(TasksService);
  });

  // add mock task to state
  function addMockTask(): Task {
    const task = new Task({ title: 'Hello' });
    service['state'].set(task.id, task);
    return task;
  }

  function getTasksFromState(): Task[] {
    return Array.from(service['state'].values());
  }

  describe('getById', () => {
    it('should throw 404 if task does not exist', async () => {
      await expect(service.getById(randomUUID())).rejects.toThrow(
        NotFoundException
      );
    });

    it('should return task', async () => {
      const task = addMockTask();
      const result = await service.getById(task.id);
      expect(result).toEqual(task);
    });
  });

  describe('getMany', () => {
    it('should return tasks', async () => {
      const result = await service.getMany();
      const tasks = getTasksFromState();
      expect(result).toEqual({
        data: tasks.slice(0, 5),
        hasNextPage: true,
        hasPrevPage: false,
        nextPage: 2,
        pages: 2,
        prevPage: null,
        total: 10,
      });
    });

    it('should get second page', async () => {
      const tasks = getTasksFromState();
      const result = await service.getMany(2);

      expect(result).toEqual({
        data: tasks.slice(5),
        hasNextPage: false,
        hasPrevPage: true,
        nextPage: null,
        pages: 2,
        prevPage: 1,
        total: 10,
      });
    });
  });

  describe('create', () => {
    it('should create task', async () => {
      const task = await service.create({ title: 'Test task' });
      const result = await service.getById(task.id);
      expect(result.title).toEqual('Test task');
    });
  });

  describe('updateById', () => {
    it('should update task', async () => {
      const task = addMockTask();
      const result = await service.updateById(task.id, { completed: true });
      expect(result.completed).toBeTruthy();
    });
  });

  describe('deleteById', () => {
    it('should delete task', async () => {
      const task = addMockTask();
      await service.deleteById(task.id);
      expect(service.getById(task.id)).rejects.toThrow(NotFoundException);
    });
  });
});
