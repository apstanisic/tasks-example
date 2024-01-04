import { Outlet, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginPage } from './LoginPage';
import { TaskEditPage } from './TaskEditPage';
import { TaskListPage } from './TaskListPage';
import { TaskCreatePage } from './TasksCreatePage';

const Layout = () => {
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: '/',
        Component: TaskListPage,
      },
      {
        path: '/tasks/create',
        Component: TaskCreatePage,
      },
      {
        path: '/tasks/edit/:id',
        Component: TaskEditPage,
      },
      {
        path: '/login',
        Component: LoginPage,
      },
    ],
  },
]);
