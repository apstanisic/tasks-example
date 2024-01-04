import { AddAlert } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { isArray } from 'lodash';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { useApi } from '../api-client/use-api';
import { ButtonLink } from '../components/ButtonLink';
import { Header } from '../components/Header';
import { TaskListItem } from '../components/tasks/TaskListItem';

const intSchema = z.coerce.number().int().min(1).default(1).catch(1);

export function TaskListPage() {
  const [params, setParams] = useSearchParams();
  const api = useApi();
  const page = useMemo(() => intSchema.parse(params.get('page')), [params]);
  const query = useQuery({
    queryKey: ['tasks', page],
    queryFn: () => api.getManyTasks(page),
  });

  // Move to previous page, if response is empty page
  useEffect(() => {
    if (page > 1 && isArray(query.data?.data) && query.data.data.length === 0) {
      setParams({ page: String(page - 1) });
    }
  }, [page, query.data, setParams]);

  return (
    <div>
      <Header title="Tasks" />
      <div className="w-full text-center my-8">
        <ButtonLink to="/tasks/create" endIcon={<AddAlert />}>
          Create task
        </ButtonLink>
      </div>
      <div className="mx-auto w-full max-w-xl">
        <div className="flex flex-col gap-y-2">
          {query.data?.data.map((item) => (
            <TaskListItem key={item.id} task={item} />
          ))}
        </div>
        <div className="flex justify-center gap-x-4 py-4">
          <ButtonLink
            to={`/?page=${page - 1}`}
            disabled={!query.data?.hasPrevPage}
          >
            Previous
          </ButtonLink>
          <ButtonLink
            to={`/?page=${page + 1}`}
            disabled={!query.data?.hasNextPage}
          >
            Next
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
