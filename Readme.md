# SocialX project for mobile app

## Prerequisite
Assuming the development is done on a macOS machine, you will need to have the following installed:

1. Install npm 5+, node 8+, watchman 4.9+ and yarn 1.5+ (you can use [HomeBrew](https://brew.sh) to install them)

2. Using node or yarn do a global install for [React native CLI](https://www.npmjs.com/package/react-native-cli)

3. For Android development Android Studio 3+ is required and this comes with bundle SDK, 
but you need to install SDK for android 6 (API 23) in addition and also you need Java 8+ installed.

More details about these 3 steps can be found on [React native docs](https://facebook.github.io/react-native/docs/getting-started.html)
under section "Building Projects with Native Code". You can choose from there your OS and see guides for both iOS and android.

## Work flow and getting started
1. Clone this repo: `git clone git@bitbucket.org:nolimitdigital/socialx_app_final.git` 
2. Checkout the development branch with `git checkout development`
3. Create a new branch specific to the task you have, and make the name of the branch informative, eg: `git checkout -b "feature/user-friend-logic"`
4. Make sure you test all changes on both iOS(requires macOS machine and Xcode9+) and Android. Many things can be platform specific.  
5. Good to include JIRA task ID in the commit message.
6. Make sure you are following the code style and make sure you have linting on
7. Before pushing your changes always make sure to run `yarn run precommit` if it doesnt run before you commit
8. After wrapping and finishing the task, create a pull request to the `development` branch accordingly, afterwards a core team member will review the changes and approve/fixup/report the changes

## Running the app:

1. Make sure you first run `yarn install`. We use yarn instead of npm and only maintain yarn.lock. If is required you have yarn 1.5+ installed.
2. Before running you must start the bundler: `yarn start` with optional parameter `--reset-cache`.
3. Running Android project on USB connected device: `react-native run-android`. Not tested but should be the same to run on local emulator.
Make sure your device is recognized by the PC/Mac and it should have developer mode and usb debugging enabled.
 Use command `adb devices` to list all USB connected devices and emulators.
4. Running iOS project (requires macOS 10.12.4 or newer and XCode 9+):
- you need to have installed cocoapods as a global dependency `sudo gem install cocoapods`. This will take some time, don't worry :)
- before running make sure you go to iOS folder (`cd ios`) and run `pod install`. This step must be repeated each time 
you do a 'reinstall' of dependencies using `yarn install` after deleting `node_modules` folder.
- for running you can use command `react-native run-ios` or open `ios/SocialxTypeActress.xcworkspace` with Xcode and run from there.

## Running storybook project:

Many components in this project were first developed with [Storybooks](https://github.com/storybooks/storybook/tree/master/app/react-native)
To run the storybook project just open `index.js` file in project root and toggle comment the two lines with `registerComponent`

To run the Storybook:
- `yarn run storybook`, this is the bundler command
- open browser at address `http://localhost:7007` and you can browse the components and change properties from there.
Don't refresh the browser when you make changes, instead use know mechanisms for reloading on device. 
- on android device you need to enable port forwarding with `adb reverse tcp:7007 tcp:7007`
- run on device using `react-native run-android`, `react-native run-ios` or from Xcode.

Make sure you don't commit index.js file with Storybook enabled.


## Distributing signed builds using [AppCenter](https://appcenter.ms/apps)

Signing configuration is required for each branch we want to use for distributing test builds.

**Android:** All the setup for signing the APK is already made. In AppCenter just enable 'Sign builds' and check 
'My Gradle settings are entirely set to handle signing automatically'

**iOS:** Here after enabling 'Sign builds' one must upload provisioning profile and exported .p12 certificate.
Those can be found in Google Drive folder 'Corporate Identity/iOS signing files'. Password for p12 file is 'SocX2018' 
 