import {AppRegistry} from 'react-native';
import App from './App';
import Storybook from "./storybook";

AppRegistry.registerComponent('SocialxTypeActress', () => App);
// AppRegistry.registerComponent('SocialxTypeActress', () => Storybook); // enable this when running Storybook

console.disableYellowBox = true; // enable to defeat all yellow boxes that stand in your glorious path