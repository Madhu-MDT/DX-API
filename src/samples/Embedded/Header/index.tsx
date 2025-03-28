import { Typography, Switch } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const useStyles = makeStyles(theme => ({
  embeddedHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70px',
    padding: '0px 30px',
    backgroundColor: '#00d66c', // Updated header color
    color: theme.palette.secondary.contrastText
  },
  embedTopIcon: {
    width: '30px',
    filter: 'invert(100%)'
  },
  embedTopLogo: {
    width: '65px',
    filter: 'invert(100%)'
  },
  items: {
    display: 'flex',
    alignItems: 'right'
  },
  icon: {
    fontSize: '20ps'
  },
  avatar: {
    width: '35px',
    height: '35px',
    borderRadius: '50%'
  },
  item: {
    display: 'flex',
    alignItems: 'right',
    margin: '0.3rem',
    position: 'relative'
  },
  counter: {
    width: '15px',
    height: '15px',
    backgroundColor: 'red',
    borderRadius: '50%',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    position: 'absolute',
    top: '0',
    right: '0'
  },
  logoData: {
    display: 'flex',
    alignItems: 'center'
  },
  itemGroup: {
    marginLeft: '4%'
  }
}));

export default function Header() {
  const classes = useStyles();
  const [language, setLanguage] = useState('English');
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(prev => !prev);
  };

  const handleLanguageChange = newLanguage => {
    setLanguage(newLanguage);
  };

  return (
    <div style={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)' }} className={classes.embeddedHeader}>
      <div className={classes.logoData}>
        <img src='./assets/img/images.svg' className={classes.embedTopLogo} />
        &nbsp;&nbsp;&nbsp;
        <Typography variant='h4' onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>
          Transavia
        </Typography>
      </div>
      <div className={classes.itemGroup}>
        <div className={classes.items}>
          <div className={classes.item}>
            <Switch checked={isChecked} onChange={handleToggle} color='primary' icon={<Brightness4Icon />} checkedIcon={<Brightness7Icon />} />
          </div>
          <div className={classes.item}>
            <LanguageOutlinedIcon className={classes.icon} />
            {language}
          </div>
          <div className={classes.item} onClick={() => handleLanguageChange('English')}>
            <FullscreenExitOutlinedIcon className={classes.icon} />
          </div>
          <div className={classes.item} onClick={() => handleLanguageChange('Spanish')}>
            <NotificationsNoneOutlinedIcon className={classes.icon} />
            <div className={classes.counter}>1</div>
          </div>
          <div className={classes.item}>
            <ChatBubbleOutlineOutlinedIcon className={classes.icon} />
            <div className={classes.counter}>5</div>
          </div>
          <div className={classes.item}>
            <ListOutlinedIcon className={classes.icon} />
          </div>
          <div className='item'>
            <img
              src='https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              alt=''
              className={classes.avatar}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
