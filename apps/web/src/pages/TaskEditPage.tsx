import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../api-client/use-api';
import { Header } from '../components/Header';
import { TaskForm } from '../components/tasks/TaskForm';
import { CreateTask } from '../schema/create-task.schema';
import { useUser } from '../state/user.atom';

export function TaskEditPage() {
  const id = useParams<{ id: string }>().id;
  const api = useApi();
  const navigate = useNavigate();
  const [user] = useUser();

  const query = useQuery({
    queryKey: ['tasks', id],
    queryFn: () => api.getTaskById(id!),
    enabled: !!user,
  });

  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate, user]);

  const data = useMemo(() => {
    return {
      ...query.data,
      dueDate: query.data?.dueDate ? new Date(query.data.dueDate) : null,
    } as CreateTask;
  }, [query.data]);

  if (!id) return <p>Invalid URL</p>;

  return (
    <div>
      <div>
        <Header title="Edit task" />
        {query.data ? (
          <TaskForm
            successMessage="Task changed!"
            data={data}
            onSubmit={(data) => api.updateTask(id, data)}
          />
        ) : (
          <p className="text-center text-xl text-orange-600">No data</p>
        )}
      </div>
    </div>
  );
}
