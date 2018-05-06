import {AppRegistry} from 'react-native';
import App from './App';
import Storybook from "./storybook";
import Crashes from 'appcenter-crashes';
import {Sentry} from 'react-native-sentry';
// key:secret
Sentry.config('https://84007825d1ae49a0aa23f3542d608de1@sentry.io/1201723', {
    logLevel: SentryLog.Debug
}).install();

AppRegistry.registerComponent('SocialxTypeActress', () => App);
// AppRegistry.registerComponent('SocialxTypeActress', () => Storybook); // enable this when running Storybook

console.disableYellowBox = true; // enable to defeat all yellow boxes that stand in your glorious path