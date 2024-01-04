import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
} from '@tanstack/react-query';
import { Provider } from 'jotai';
import { RouterProvider } from 'react-router-dom';
import { router } from '../pages/router';
import { Localization } from './Localization';

const qc = new QueryClient({
  // keep previous data, until next "page" is ready
  defaultOptions: { queries: { placeholderData: keepPreviousData } },
});

export function App() {
  return (
    <Provider>
      <QueryClientProvider client={qc}>
        <Localization>
          <RouterProvider router={router} />
        </Localization>
      </QueryClientProvider>
    </Provider>
  );
}
