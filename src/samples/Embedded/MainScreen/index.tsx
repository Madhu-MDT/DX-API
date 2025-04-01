/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useMemo, useState } from 'react';
import LeftNavigation from '../../../components/LeftNavigation'; // Adjusted the path to match the correct file structure
import ChatWindow from './ChatWindow'; // Ensure ChatWindow is imported
// import chatbotIcon from '../../../assets/icons/chatbot.svg'; // Importing the chatbot icon
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getSdkConfig } from '@pega/auth/lib/sdk-auth-manager';

import StoreContext from '@pega/react-sdk-components/lib/bridge/Context/StoreContext';
import createPConnectComponent from '@pega/react-sdk-components/lib/bridge/react_pconnect';

import ShoppingOptionCard from '../ShoppingOptionCard';
import ResolutionScreen from '../ResolutionScreen';
import { shoppingOptions } from '../utils';

function RootComponent(props) {
  const PegaConnectObj = createPConnectComponent();
  const thePConnObj = <PegaConnectObj {...props} />;

  const contextValue = useMemo(() => {
    return { store: PCore.getStore(), displayOnlyFA: true };
  }, [PCore.getStore()]);

  return <StoreContext.Provider value={contextValue}>{thePConnObj}</StoreContext.Provider>;
}

const useStyles = makeStyles(() => ({
  embedMainScreen: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  embedBanner: {
    textAlign: 'center',
    width: '100%',
    padding: '20px'
  },
  embedShoppingOptions: {
    display: 'flex',
    justifyContent: 'space-evenly' // Reverted to original spacing
  },
  pegaPartInfo: {
    display: 'flex',
    flexDirection: 'row'
  },
  pegaPartPega: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column'
  },
  pegaPartText: {
    paddingLeft: '50px'
  },
  pegaPartAccompaniment: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  pegaPartAccompanimentText: {
    fontSize: '30px',
    lineHeight: '40px',
    padding: '20px 20px',
    color: 'darkslategray'
  },
  pegaPartAccompanimentImage: {
    width: '100%',
    borderRadius: '10px'
  }
}));

interface MainScreenProps {}

export default function MainScreen(props: MainScreenProps) {
  const classes = useStyles();

  const [showPega, setShowPega] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false); // State for chat window visibility
  const [showResolution, setShowResolution] = useState(false);
  const [showTriplePlayOptions, setShowTriplePlayOptions] = useState(true);

  useEffect(() => {
    // Removed chat window close on navigation
    PCore.getPubSubUtils().subscribe(PCore.getConstants().PUB_SUB_EVENTS.EVENT_CANCEL, () => cancelAssignment(), 'cancelAssignment');
    PCore.getPubSubUtils().subscribe('assignmentFinished', () => assignmentFinished(), 'assignmentFinished');

    return () => {
      PCore.getPubSubUtils().unsubscribe(PCore.getConstants().PUB_SUB_EVENTS.EVENT_CANCEL, 'cancelAssignment');
      PCore.getPubSubUtils().unsubscribe('assignmentFinished', 'assignmentFinished');
    };
  });

  const cancelAssignment = () => {
    setShowTriplePlayOptions(true);
    setShowPega(false);
  };

  const assignmentFinished = () => {
    setShowResolution(true);
    setShowPega(false);
  };

  const onShopNow = async (optionClicked: string) => {
    const sLevel = optionClicked;
    setShowTriplePlayOptions(false);
    setShowPega(true);
    setShowChatWindow(true); // Open chat window on first click

    const sdkConfig = await getSdkConfig();
    let mashupCaseType = sdkConfig.serverConfig.appMashupCaseType;

    if (!mashupCaseType) {
      const environmentInfo = PCore.getEnvironmentInfo();
      const caseTypes: any = environmentInfo && environmentInfo.environmentInfoObject ? environmentInfo.environmentInfoObject.pyCaseTypeList : null;
      mashupCaseType = caseTypes ? caseTypes[1].pyWorkTypeImplementationClassName : null;
    }

    const options: any = {
      pageName: 'pyEmbedAssignment',
      startingFields: {}
    };

    if (mashupCaseType === 'BRT-Claims-Work') {
      options.startingFields.Package = sLevel;
    }

    PCore.getMashupApi()
      .createCase(mashupCaseType, PCore.getConstants().APP.APP, options)
      .then(() => {
        // console.log('createCase rendering is complete');
      });
  };

  function getShowTriplePlayOptionsMarkup() {
    const theBanner = (
      <div className={classes.embedMainScreen}>
        <div className={classes.embedBanner}>
          <Typography variant='h3' style={{ paddingLeft: '200px', display: 'flex', justifyContent: 'center' }}>
            Where do you want to go?
          </Typography>
        </div>
      </div>
    );

    const theOptions = shoppingOptions.slice(0, 2).map((option, index) => {
      return (
        <ShoppingOptionCard key={option.level} {...shoppingOptions[index]} onClick={onShopNow} style={{ margin: '0px 20px', padding: '10px' }} />
      );
    });

    return (
      <div style={{ display: 'flex' }}>
        {' '}
        {/* Wrap the main content in a flex container */}
        <LeftNavigation /> {/* Add the LeftNavigation component */}
        <div>
          {theBanner}
          <div
            className={classes.embedShoppingOptions}
            style={{ paddingLeft: '280px', paddingTop: '10px', display: 'flex', justifyContent: 'center', gap: '250px' }}
          >
            {theOptions}
          </div>
          <button
            type='button'
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            onClick={() => setShowChatWindow(prev => !prev)} // Toggle chat window
          >
            <img
              src='../../../assets/img/chatbot.png' // Placeholder for chatbot icon
              alt='Chatbot'
              width={80}
              height={80}
              style={{ position: 'fixed', bottom: '150px', right: '40px' }}
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage:
          'url("https://i0.wp.com/backgroundabstract.com/wp-content/uploads/edd/2024/04/642-01-e1713790588392.jpg?resize=1000%2C750&ssl=1")', // Add your HD image URL here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh' // Ensure it covers the full height
      }}
    >
      {showTriplePlayOptions ? getShowTriplePlayOptionsMarkup() : null}
      {showResolution ? <ResolutionScreen /> : null}
      {showChatWindow ? <ChatWindow /> : null} {/* Render chat window if visible */}
      {showPega ? (
        <div className={classes.pegaPartInfo}>
          <div className={classes.pegaPartPega} id='pega-part-of-page'>
            <RootComponent {...props} />
            <br />
            <div className={classes.pegaPartText}> * - required fields</div>
          </div>
          <div className={classes.pegaPartAccompaniment}>
            <div className={classes.pegaPartAccompanimentText}>Accompaniment</div>
            <div>
              <img
                style={{ boxShadow: '0px 4px 4px rgba(29, 31, 30, 0.5)' }}
                src='../../../assets/img/cableinfo.jpg'
                className={classes.pegaPartAccompanimentImage}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
