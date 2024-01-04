import { Button } from '@mui/material';
import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export function ButtonLink(props: {
  children?: ReactNode;
  endIcon?: ReactNode;
  to: string;
  disabled?: boolean;
}) {
  return (
    <Button
      component={RouterLink}
      to={props.to}
      endIcon={props.endIcon}
      disabled={props.disabled}
      variant="contained"
    >
      {props.children}
    </Button>
  );
}
