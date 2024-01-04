import axios, { AxiosError, AxiosInstance } from 'axios';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { CreateTask } from '../schema/create-task.schema';
import { UpdateTask } from '../schema/update-task.schema';
import { Task } from '../types/task';
export class ApiClient {
  client: AxiosInstance;
  constructor(url: string) {
    // set base url
    this.client = axios.create({ withCredentials: true, baseURL: url });

    // auto show error toast on error
    this.client.interceptors.response.use(undefined, (err: AxiosError) => {
      toast(get(err.response?.data, 'message', 'Problem with server'), {
        type: 'error',
      });
    });
  }

  async login(
    email: string,
    password: string
  ): Promise<{ email: string; token: string }> {
    return this.client
      .post('auth/login', { email, password })
      .then((res) => res.data);
  }

  setToken(token: string | null) {
    if (token) {
      this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common.Authorization;
    }
  }

  async getManyTasks(page: number = 1): Promise<{
    data: Task[];
    total: number;
    pages: number;
    nextPage: number | null;
    prevPage: number | null;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }> {
    return this.client.get(`tasks?page=${page}`).then((res) => res.data);
  }

  async getTaskById(id: string): Promise<Task> {
    return this.client.get(`tasks/${id}`).then((res) => res.data.data);
  }

  async createTask(data: CreateTask): Promise<Task> {
    return this.client.post('tasks', data).then((res) => res.data.data);
  }

  async updateTask(id: string, data: UpdateTask): Promise<Task> {
    return this.client.patch(`tasks/${id}`, data).then((res) => res.data.data);
  }

  async deleteTask(id: string): Promise<Task> {
    return this.client.delete(`tasks/${id}`).then((res) => res.data.data);
  }
}
