import { Typography, Select, MenuItem } from '@mui/material'; // Import Select and MenuItem
import translations from '../translations'; // Import translations
import { useState } from 'react';
import { makeStyles } from '@mui/styles';

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
  const [language, setLanguage] = useState('English'); // Default language
  const [translatedLabels, setTranslatedLabels] = useState(translations[language]); // Initialize translated labels

  const handleLanguageChange = newLanguage => {
    setLanguage(newLanguage); // Update the selected language
    setTranslatedLabels(translations[newLanguage]); // Update translated labels
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
            <Select
              value={language}
              onChange={e => handleLanguageChange(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Select Language' }}
            >
              <MenuItem value='English'>English</MenuItem>
              <MenuItem value='Spanish'>Spanish</MenuItem>
              <MenuItem value='French'>French</MenuItem>
              <MenuItem value='German'>German</MenuItem>
              <MenuItem value='Dutch'>Dutch</MenuItem>
              <MenuItem value='Swedish'>Swedish</MenuItem>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
