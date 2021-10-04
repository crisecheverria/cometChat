/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {COMETCHAT_CONSTANTS} from './CONSTS';

const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .build();
CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(
  () => {
    console.log('Initialization completed successfully');
    // You can now call login function.
  },
  error => {
    console.log('Initialization failed with error:', error);
    // Check the reason for error and take appropriate action.
  },
);

AppRegistry.registerComponent(appName, () => App);
