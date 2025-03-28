/* eslint-disable react/button-has-type */
import { iconButtonClasses } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  swatchHeader: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#00d66c', // Match Transavia card color
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 1)'
  },
  swatchPackage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '260px',
    height: '70px',
    backgroundColor: '#00d66c',
    padding: '5px'
  },
  swatchPlay: {
    letterSpacing: 'normal',
    color: '#ffffff', // Match Transavia text color
    fontSize: '20px' // Adjust font size to match Transavia design
  },
  swatchLevel: {
    letterSpacing: 'normal',
    color: 'white',
    fontSize: '26px',
    paddingLeft: '10px', // Adjust font size to match Transavia design
    fontWeight: 'bold'
  },
  swatchChannels: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    letterSpacing: 'normal',
    alignItems: 'center',
    backgroundColor: '#00d66c',
    width: '100px'
  },
  swatchCount: {
    letterSpacing: 'normal',
    color: '#00d66c', // Match Transavia card color
    fontSize: '40px',
    fontWeight: 'bold'
  },
  swatchLabel: {
    letterSpacing: 'normal',
    color: 'white',
    fontSize: '17px'
  },
  swatchBody: {
    letterSpacing: 'normal',
    border: '1px solid lightgray',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '24px',
    alignItems: 'center',
    paddingBottom: '20px',
    borderRadius: '0px 0px 15px 15px',
    boxShadow: '0px 4px 4px rgba(107, 105, 105, 0.274)'
  },
  swatchBanner: {
    letterSpacing: 'normal',
    fontWeight: 'bold',
    fontSize: '15px',
    padding: '5px'
  },
  swatchPrice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  swatchFromGroup: {
    height: '90px'
  },
  swatchFrom: {
    color: '#00d66c', // Match Transavia text color
    textAlign: 'right'
  },
  swatchCurrency: {
    letterSpacing: 'normal',
    color: theme.palette.primary.main,
    fontSize: '24px', // Adjust font size to match Transavia design
    fontWeight: 'bold',
    fontFamily: 'Tahoma'
  },
  swatchDollars: {
    letterSpacing: 'normal',
    color: theme.palette.primary.main,
    fontSize: '70px', // Adjust font size to match Transavia design
    fontWeight: 'bold',
    fontFamily: 'Tahoma'
  },
  swatchCents: {
    letterSpacing: 'normal',
    color: theme.palette.primary.main,
    fontSize: '16px', // Adjust font size to match Transavia design
    fontWeight: 'bold',
    fontFamily: 'Tahoma'
  },
  swatchMonthly: {
    display: 'flex',
    flexDirection: 'column'
  },
  swatchShopButton: {
    color: 'white',
    backgroundColor: '#ff3268', // Match Transavia card color
    fontSize: '20px', // Adjust font size to match Transavia design
    fontWeight: 'bold',
    borderRadius: '25px',
    border: '0px',
    margin: '20px',
    padding: '10px 30px'
  }
}));

export default function ShoppingOptionCard(props) {
  const classes = useStyles();

  const { play, level, channels, channels_full: channelsFull, channelsfull2, channelsfull3, banner, internetSpeed, calling } = props;

  return (
    <div>
      <div className={classes.swatchHeader}>
        <div className={classes.swatchPackage}>
          <div className={classes.swatchPlay}>{play}</div>
          <div className={classes.swatchLevel}>{level}</div>
        </div>
        <div className={classes.swatchChannels}>
          <div className={classes.swatchCount}>{iconButtonClasses[channels]}</div>
        </div>
      </div>
      <div className={classes.swatchBody}>
        <div className={classes.swatchBanner}>{banner}</div>
        <ul>
          <li>{channelsFull}</li>
          <li>{channelsfull2}</li>
          <li>{channelsfull3}</li>
          <li>{internetSpeed}</li>
          <li>{calling}</li>
        </ul>

        <div>
          <button className={classes.swatchShopButton} onClick={() => props.onClick(level)} style={{ cursor: 'pointer' }}>
            Apply NOW
          </button>
        </div>
      </div>
    </div>
  );
}
