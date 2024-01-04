import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { AxiosError } from 'axios';
import { get } from 'lodash';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CreateTask, createTaskSchema } from '../../schema/create-task.schema';
import { CheckboxInput } from '../form/CheckboxInput';
import { DateTimeInput } from '../form/DateInput';
import { TextInput } from '../form/TextInput';

export function TaskForm(props: {
  data: CreateTask;
  onSubmit: (data: CreateTask) => unknown;
  successMessage: string;
}) {
  const { data, successMessage } = props;
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    values: data,
    resolver: zodResolver(createTaskSchema),
  });

  const onSubmit = useCallback(
    async (data: CreateTask) => {
      try {
        await props.onSubmit(data);
        toast(successMessage, { type: 'success' });
      } catch (error) {
        setError('root', {
          message: get(
            error as AxiosError,
            'response.data.message',
            'Invalid data'
          ),
        });
      }
    },
    [props, setError, successMessage]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto gap-y-6 grid"
    >
      <TextInput control={control} label="Title" name="title" required />
      <TextInput control={control} label="Description" name="description" />
      <CheckboxInput control={control} label="Completed" name="completed" />
      <DateTimeInput control={control} label="Due date" name="dueDate" />

      <Button variant="outlined" type="submit">
        Submit
      </Button>
      {errors.root && (
        <p className="text-red-600 my-2">{errors.root.message}</p>
      )}
    </form>
  );
}
