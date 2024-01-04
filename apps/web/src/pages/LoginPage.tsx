import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { useCallback, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useApi } from '../api-client/use-api';
import { TextInput } from '../components/form/TextInput';
import { useUser } from '../state/user.atom';

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(4).max(40),
});

type FormData = z.infer<typeof schema>;

export function LoginPage() {
  const [user, setUser] = useUser();
  const navigate = useNavigate();
  const api = useApi();

  useLayoutEffect(() => {
    if (user) navigate('/');
  }, [navigate, user]);

  const { control, handleSubmit } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      const res = await api.login(data.email, data.password);
      setUser(res);
      navigate('/');
    },
    [api, navigate, setUser]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md flex flex-col gap-y-6 p-4 mt-8 mx-auto shadow-xl border rounded"
    >
      <h1 className="text-xl mx-auto">Please log in</h1>
      <TextInput control={control} label="Email" name="email" />
      <TextInput
        control={control}
        label="Password"
        name="password"
        type="password"
      />
      <Button variant="contained" type="submit">
        Login
      </Button>
    </form>
  );
}
