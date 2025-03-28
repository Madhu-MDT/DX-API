import { useState } from 'react';
import { ListItemIcon, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material'; // Import ListItemIcon
import HomeIcon from '@mui/icons-material/Home'; // Import HomeIcon
import WorkIcon from '@mui/icons-material/Work'; // Import WorkIcon
import InsightsIcon from '@mui/icons-material/Insights'; // Import InsightsIcon
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 280
  },
  toggleButton: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2)
  }
}));

const LeftNavigation = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton className={classes.toggleButton} onClick={toggleDrawer}>
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer anchor='left' open={open} onClose={toggleDrawer}>
        <div>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3As1Nnt2YDGpIF74UJnl4CCoBy2wHP_p-sg&s'
            alt='Company Logo'
            style={{ width: '200px', height: 'auto', paddingTop: '50px', paddingLeft: '20px' }}
          />
        </div>
        <div className={classes.drawer}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon /> {/* Add the Home icon here */}
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <WorkIcon /> {/* Add the Work icon here */}
              </ListItemIcon>
              <ListItemText primary='My Work' />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <InsightsIcon /> {/* Add the Insights icon here */}
              </ListItemIcon>
              <ListItemText primary='Insights' />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default LeftNavigation;
