import { Home } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../state/user.atom';

export function Header(props: { title: string }) {
  const nav = useNavigate();
  const [user, setUser] = useUser();
  return (
    <AppBar position="static" className="mb-8">
      <Toolbar className="items-center justify-between">
        <IconButton color="inherit" onClick={() => nav('/')}>
          <Home />
        </IconButton>
        <p className="ml-4">{props.title}</p>
        {!user ? (
          <Link to={'/login'}>Log in</Link>
        ) : (
          <button onClick={() => setUser(null)}>Logout</button>
        )}
      </Toolbar>
    </AppBar>
  );
}
