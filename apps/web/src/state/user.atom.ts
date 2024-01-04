import { useAtom } from 'jotai';
import { atomWithLocalStorage } from '../utils/persist-atom';
export type User = {
  email: string;
  token: string;
};

const userAtom = atomWithLocalStorage<User | null>('user', null);

export function useUser() {
  return useAtom(userAtom);
}
