import {AppRegistry} from 'react-native';
import App from './App';
import Storybook from "./storybook";

AppRegistry.registerComponent('SocialxTypeActress', () => App);
// TODO @serkan ask @jake why?
// AppRegistry.registerComponent('SocialxTypeActress', () => Storybook); // enable this when running Storybook

console.disableYellowBox = true; // enable to defeat all yellow boxes that stand in your glorious path

/*

TODO: @serkan ask @jake why not upgrade deps using output from yarn outdated

Package                             Current Wanted  Latest  Workspace          Package Type    URL
@storybook/addon-actions            3.4.3   3.4.3   3.4.5   socialxtypeactress devDependencies https://github.com/storybooks/storybook/tree/master/addons/actions
@storybook/addon-knobs              3.4.3   3.4.3   3.4.5   socialxtypeactress devDependencies https://github.com/storybooks/storybook#readme
@storybook/addon-links              3.4.3   3.4.3   3.4.5   socialxtypeactress devDependencies https://github.com/storybooks/storybook/tree/master/addons/links
@storybook/addons                   3.4.3   3.4.3   3.4.5   socialxtypeactress devDependencies https://github.com/storybooks/storybook/tree/master/packages/addons
@storybook/react-native             3.4.3   3.4.3   3.4.5   socialxtypeactress devDependencies https://github.com/storybooks/storybook/tree/master/app/react-native
@types/d3-shape                     1.2.2   1.2.3   1.2.3   socialxtypeactress devDependencies https://github.com/DefinitelyTyped/DefinitelyTyped.git.git
@types/react-native                 0.52.25 0.52.25 0.55.15 socialxtypeactress devDependencies https://github.com/DefinitelyTyped/DefinitelyTyped.git.git
@types/react-navigation             1.2.1   1.2.1   1.5.11  socialxtypeactress devDependencies https://github.com/DefinitelyTyped/DefinitelyTyped.git.git
@types/react-redux                  5.0.20  5.0.20  6.0.0   socialxtypeactress devDependencies https://github.com/DefinitelyTyped/DefinitelyTyped.git.git
aws-amplify                         0.2.15  0.2.15  0.4.1   socialxtypeactress dependencies    https://github.com/aws/aws-amplify#readme
aws-appsync-react                   1.0.6   exotic  exotic  socialxtypeactress dependencies    git+https://github.com/Shadyzpop/aws-appsync-react.git
aws-sdk                             2.243.1 2.245.1 2.245.1 socialxtypeactress dependencies    https://github.com/aws/aws-sdk-js
babel-jest                          22.4.0  22.4.0  22.4.4  socialxtypeactress devDependencies https://github.com/facebook/jest#readme
hex-rgb                             2.0.0   2.0.0   3.0.0   socialxtypeactress dependencies    https://github.com/sindresorhus/hex-rgb#readme
native-base                         2.4.3   2.4.3   2.4.5   socialxtypeactress dependencies    https://github.com/GeekyAnts/NativeBase#readme
npm                                 5.10.0  5.10.0  6.1.0   socialxtypeactress dependencies    https://docs.npmjs.com/
react                               16.3.1  16.3.1  16.4.0  socialxtypeactress dependencies    https://reactjs.org/
react-dom                           16.3.2  16.4.0  16.4.0  socialxtypeactress devDependencies https://reactjs.org/
react-native-fast-image             4.0.0   4.0.0   4.0.14  socialxtypeactress dependencies    https://github.com/DylanVann/react-native-fast-image#readme
react-native-image-crop-picker      0.20.1  0.20.1  0.20.3  socialxtypeactress dependencies    https://github.com/ivpusic/react-native-image-crop-picker#readme
react-native-modal                  5.4.0   5.4.0   6.0.0   socialxtypeactress dependencies    https://github.com/react-native-community/react-native-modal
react-native-svg-charts             4.2.0   4.2.0   5.0.0   socialxtypeactress dependencies    https://github.com/JesperLekland/react-native-svg-charts
react-native-tcp                    3.3.0   exotic  exotic  socialxtypeactress dependencies    https://github.com/Shadyzpop/react-native-tcp
react-native-typescript-transformer 1.2.5   1.2.7   1.2.7   socialxtypeactress devDependencies https://github.com/ds300/react-native-typescript-transformer#readme
react-navigation                    1.2.1   1.2.1   2.0.1   socialxtypeactress dependencies    https://github.com/react-navigation/react-navigation#readme
react-test-renderer                 16.3.2  16.4.0  16.4.0  socialxtypeactress devDependencies https://reactjs.org/
readable-stream                     1.1.14  1.1.14  2.3.6   socialxtypeactress dependencies    https://github.com/nodejs/readable-stream#readme
redux                               3.7.2   3.7.2   4.0.0   socialxtypeactress dependencies    http://redux.js.org
rn-nodeify                          10.0.0  exotic  exotic  socialxtypeactress devDependencies https://github.com/Shadyzpop/rn-nodeify
stream-browserify                   1.0.0   1.0.0   2.0.1   socialxtypeactress dependencies    https://github.com/substack/stream-browserify
typesafe-actions                    1.1.3   1.1.3   2.0.3   socialxtypeactress dependencies    https://github.com/piotrwitek/typesafe-actions

TODO: @serkan also discuss with @jake tooling (lint, pretty, shim, workspaces/lerna, jest, storybook as well as the current npm scripts)

*/
