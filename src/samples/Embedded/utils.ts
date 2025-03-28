import { sdkSetAuthHeader, sdkSetCustomTokenParamsCB } from '@pega/auth/lib/sdk-auth-manager';

export const shoppingOptions = [
  {
    level: 'Compensation',
    channels_full: 'Flight delay (>3 hours)',
    channelsfull2: 'Cancelled flight',
    channelsfull3: 'Overbooking',
    channelsfull4: 'Lost baggage',

    price: '5-12.00',
    internetSpeed: 'Missed connection',
    calling: 'In-flight service failure'
  },
  {
    level: 'Dispute',
    channels_full: 'Denied compensation',
    channelsfull2: 'Incorrect refund amount',
    channelsfull3: 'Baggage damage dispute',
    price: '6-12.00',
    internetSpeed: 'Chargeback requests',
    calling: 'Escalation (if needed)'
  },
  {
    level: 'Test Automation',
    channels_full: 'Tech Skills: Selenium, Appium, Java/Python.',
    channelsfull2: 'Automation: CI/CD, frameworks, scripting.',
    channelsfull3: 'Problem-Solving: debugging & optimization.',
    banner: 'Actively Looking for Automation Professionals',
    price: '4-8.00',
    internetSpeed: 'Teamwork: Collaboration & communication.',
    calling: 'Experience: Test strategies, past projects.'
  }
];

export function initializeAuthentication(sdkConfigAuth) {
  if ((sdkConfigAuth.mashupGrantType === 'none' || !sdkConfigAuth.mashupClientId) && sdkConfigAuth.customAuthType === 'Basic') {
    // Service package to use custom auth with Basic
    const sB64 = window.btoa(`${sdkConfigAuth.mashupUserIdentifier}:${window.atob(sdkConfigAuth.mashupPassword)}`);
    sdkSetAuthHeader(`Basic ${sB64}`);
  }

  if ((sdkConfigAuth.mashupGrantType === 'none' || !sdkConfigAuth.mashupClientId) && sdkConfigAuth.customAuthType === 'BasicTO') {
    const now = new Date();
    const expTime = new Date(now.getTime() + 5 * 60 * 1000);
    let sISOTime = `${expTime.toISOString().split('.')[0]}Z`;
    const regex = /[-:]/g;
    sISOTime = sISOTime.replace(regex, '');
    // Service package to use custom auth with Basic
    const sB64 = window.btoa(`${sdkConfigAuth.mashupUserIdentifier}:${window.atob(sdkConfigAuth.mashupPassword)}:${sISOTime}`);
    sdkSetAuthHeader(`Basic ${sB64}`);
  }

  if (sdkConfigAuth.mashupGrantType === 'customBearer' && sdkConfigAuth.customAuthType === 'CustomIdentifier') {
    // Use custom bearer with specific custom parameter to set the desired operator via
    //  a userIdentifier property.  (Caution: highly insecure...being used for simple demonstration)
    sdkSetCustomTokenParamsCB(() => {
      return { userIdentifier: sdkConfigAuth.mashupUserIdentifier };
    });
  }
}
