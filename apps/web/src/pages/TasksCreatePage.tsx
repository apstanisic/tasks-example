import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api-client/use-api';
import { Header } from '../components/Header';
import { TaskForm } from '../components/tasks/TaskForm';
import { CreateTask } from '../schema/create-task.schema';

export function TaskCreatePage() {
  const api = useApi();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const onSubmit = useCallback(
    async (data: CreateTask) => {
      const task = await api.createTask(data);
      // we know what data will look like on the edit page
      qc.setQueryData(['tasks', task.id], task);
      navigate(`/tasks/edit/${task.id}`);
    },
    [api, navigate, qc]
  );
  return (
    <div>
      <div>
        <Header title="Create task" />
        <TaskForm
          successMessage="Task created"
          data={{ title: '', completed: false, description: '', dueDate: null }}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
