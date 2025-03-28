/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
import { useEffect, useMemo, useState } from 'react';
import LeftNavigation from '../../components/LeftNavigation'; // Import the LeftNavigation component
import { useLocation, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles'; // Keeping only StyledEngineProvider
import { SdkConfigAccess, loginIfNecessary, getAvailablePortals } from '@pega/auth/lib/sdk-auth-manager';

import StoreContext from '@pega/react-sdk-components/lib/bridge/Context/StoreContext';
import createPConnectComponent from '@pega/react-sdk-components/lib/bridge/react_pconnect';
import { compareSdkPCoreVersions } from '@pega/react-sdk-components/lib/components/helpers/versionHelpers';
import { getSdkComponentMap } from '@pega/react-sdk-components/lib/bridge/helpers/sdk_component_map';
import localSdkComponentMap from '../../../sdk-local-component-map';

import InvalidPortal from './InvalidPortal';

declare const myLoadPortal: any;
declare const myLoadDefaultPortal: any;

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

function RootComponent(props) {
  const PegaConnectObj = createPConnectComponent();
  const thePConnObj = <PegaConnectObj {...props} />;

  const contextValue = useMemo(() => {
    return { store: PCore.getStore() };
  }, []);

  return <StoreContext.Provider value={contextValue}>{thePConnObj}</StoreContext.Provider>;
}

export default function FullPortal() {
  const [portalSelectionScreen, setPortalSelectionScreen] = useState(false);
  const [defaultPortalName, setDefaultPortalName] = useState<string>('');
  const [availablePortals, setAvailablePortals] = useState<string[]>([]);
  const [rootComponentProps, setRootComponentProps] = useState<object | null>(null);

  const navigate = useNavigate();
  const query = useQuery();
  if (query.get('portal')) {
    const portalValue: any = query.get('portal');
    sessionStorage.setItem('rsdk_portalName', portalValue);
  }
  if (query.get('locale')) {
    const localeOverride: any = query.get('locale');
    sessionStorage.setItem('rsdk_locale', localeOverride);
  }

  function initialRender(inRenderObj) {
    const { props, portalTarget, styleSheetTarget } = inRenderObj;
    setRootComponentProps({ ...props, portalTarget, styleSheetTarget });
  }

  function startPortal() {
    PCore.onPCoreReady(renderObj => {
      compareSdkPCoreVersions();
      getSdkComponentMap(localSdkComponentMap).then(() => {
        console.log(`SdkComponentMap initialized`);
        initialRender(renderObj);
      });
    });

    const { appPortal: thePortal, excludePortals } = SdkConfigAccess.getSdkConfigServer();
    const defaultPortal = PCore?.getEnvironmentInfo?.().getDefaultPortal?.() || '';
    const queryPortal = sessionStorage.getItem('rsdk_portalName');

    if (queryPortal) {
      myLoadPortal('pega-root', queryPortal, []);
    } else if (thePortal) {
      console.log(`Loading specified appPortal: ${thePortal}`);
      myLoadPortal('pega-root', thePortal, []);
    } else if (myLoadDefaultPortal && defaultPortal && !excludePortals.includes(defaultPortal)) {
      console.log(`Loading default portal`);
      myLoadDefaultPortal('pega-root', []);
    } else {
      console.log('Loading portal selection screen');
      setPortalSelectionScreen(true);
      setDefaultPortalName(defaultPortal);
      getAvailablePortals().then(portals => {
        setAvailablePortals(portals as string[]);
      });
    }
  }

  function loadSelectedPortal(portal) {
    setPortalSelectionScreen(false);
    myLoadPortal('app-root', portal, []);
  }

  function doRedirectDone() {
    const redirectUrl: any = sessionStorage.getItem('url');
    navigate(redirectUrl);
    sessionStorage.removeItem('url');

    const locale: any = sessionStorage.getItem('rsdk_locale') || undefined;
    loginIfNecessary({ appName: 'portal', mainRedirect: true, locale });
  }

  useEffect(() => {
    document.addEventListener('SdkConstellationReady', handleSdkConstellationReady);

    const locale: any = sessionStorage.getItem('rsdk_locale') || undefined;

    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const redirected = sessionStorage.getItem('redirected');
    if (isLoggedIn !== 'true' && redirected !== 'true') {
      sessionStorage.setItem('url', window.location.pathname);
      navigate('/portal');
    }
    sessionStorage.setItem('redirected', 'true');
    loginIfNecessary({
      appName: 'portal',
      mainRedirect: true,
      redirectDoneCB: doRedirectDone,
      locale
    });
  }, []);

  const handleSdkConstellationReady = () => {
    sessionStorage.setItem('isLoggedIn', 'true');
    startPortal();
  };

  return portalSelectionScreen ? (
    <InvalidPortal defaultPortal={defaultPortalName} portals={availablePortals} onSelect={loadSelectedPortal} />
  ) : (
    <div id='pega-root'>
      <LeftNavigation /> {/* Add the LeftNavigation component */}
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        {rootComponentProps && <RootComponent {...rootComponentProps} />}
      </StyledEngineProvider>
    </div>
  );
}
