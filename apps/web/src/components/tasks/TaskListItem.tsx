import { Check, Close, Delete, Edit } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { truncate } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useApi } from '../../api-client/use-api';
import { useUser } from '../../state/user.atom';
import { Task } from '../../types/task';

export function TaskListItem(props: { task: Task }) {
  const { task } = props;
  const api = useApi();
  const qc = useQueryClient();
  const [user] = useUser();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => {
      return api.deleteTask(task.id);
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['tasks'] });
      toast(`Task "${truncate(data.title, { length: 120 })}" deleted`, {
        type: 'success',
      });
    },
  });

  return (
    <div className="py-2 px-4 flex w-full justify-between border rounded shadow-md">
      <div>
        <div className="flex gap-x-2 items-center">
          <div className="text-lg text-blue-600 flex">
            <Tooltip title={task.completed ? 'Completed' : 'Not completed'}>
              {task.completed ? <Check /> : <Close />}
            </Tooltip>
          </div>
          <p className={clsx('text-xl', task.completed && 'line-through')}>
            {task.title}
          </p>
        </div>
        <p className="text-gray-700">{task.description}</p>
      </div>
      <div className="flex items-center gap-x-4">
        <Tooltip title={user ? '' : 'Please log in to edit'}>
          <div>
            <IconButton
              onClick={() => navigate(`/tasks/edit/${task.id}`)}
              disabled={!user}
            >
              <Edit />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip title={user ? '' : 'Please log in to delete'}>
          <div>
            <IconButton color="error" onClick={() => mutate()} disabled={!user}>
              <Delete />
            </IconButton>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
