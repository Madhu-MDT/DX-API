import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  embeddedFooter: {
    display: 'flex',
    alignItems: 'center',
    height: '64px',
    padding: '0px 20px',
    backgroundColor: '#00d66c', // Match Transavia footer color
    color: '#ffffff' // Match Transavia text color
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div style={{ boxShadow: '0px 4px 4px rgba(29, 31, 30, 0.5)' }} className={classes.embeddedFooter}>
      <Typography align='center' variant='h6' style={{ color: '#ffffff' }}>
        © Copyright 2009 – 2025 | Transavia All Rights Reserved | Privacy Policy
      </Typography>
    </div>
  );
}
