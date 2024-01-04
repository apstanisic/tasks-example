import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import { Localization } from '../../app/Localization';
import { CreateTask } from '../../schema/create-task.schema';
import { TaskForm } from './TaskForm';

const getData = (): CreateTask => ({
  title: '',
  completed: false,
  description: '',
  dueDate: null,
});

test('submit if form is valid', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  // ARRANGE
  render(
    <Localization>
      <TaskForm
        data={getData()}
        onSubmit={onSubmit}
        successMessage="Success!"
      />
    </Localization>
  );

  // ACT
  await user.type(screen.getByLabelText(/Title/), 'Hello!!');
  await user.type(screen.getByLabelText(/Description/), 'World');
  await user.click(screen.getByLabelText(/Completed/));
  await user.click(screen.getByText(/Submit/));

  // ASSERT
  expect(onSubmit).toBeCalledWith({
    completed: true,
    description: 'World',
    dueDate: null,
    title: 'Hello!!',
  });
});

test('only title is requierd', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  // ARRANGE
  render(
    <Localization>
      <TaskForm
        data={getData()}
        onSubmit={onSubmit}
        successMessage="Success!"
      />
    </Localization>
  );

  // ACT
  await user.type(screen.getByLabelText(/Title/), 'Hello!!');
  await user.click(screen.getByText(/Submit/));

  // ASSERT
  expect(onSubmit).toBeCalled();
});

test('does not submit if form is invalid', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  // ARRANGE
  render(
    <Localization>
      <TaskForm
        data={getData()}
        onSubmit={onSubmit}
        successMessage="Success!"
      />
    </Localization>
  );

  // ACT
  await user.type(screen.getByLabelText(/Title/), 'H');
  await user.type(screen.getByLabelText(/Description/), 'World');
  await user.click(screen.getByLabelText(/Completed/));
  await user.click(screen.getByText(/Submit/));

  // ASSERT
  expect(onSubmit).not.toBeCalled();
});
