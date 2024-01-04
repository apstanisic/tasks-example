import { z } from 'zod';
export const createTaskSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().max(200).nullish(),
  completed: z.boolean().default(false),
  dueDate: z.coerce.date().nullish(),
});

export type CreateTask = z.input<typeof createTaskSchema>;
