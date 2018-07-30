One time setup for FastLane, iOS
================

1. This assumes you are running with a macOS machine, and you have Xcode 9.2+ installed
2. In project root folder `sudo bundle update`. This will install fastlane using Gemfile and Gemfile.lock
3. You need to install dev. and app store certificates and profiles. 
4. Go to folder `fastlane/ios_signing_files`.
Now drag the files with extension `.mobileprovision` over opened Xcode. This will install the profiles.
5. In the same folder double click to install `.p12` files, with password `SocialX2018`. 
The certificates along with private keys will get into `Keychain` app. 

## Building and distribution for iOS via TestFlight

1. In project root folder run `bundle exec fastlane ios release version:1.0.9`. 
For TestFlight you will need the AppStore connect password for account `christian@socialx.network` 
The last parameter is the new version we want to create. The preconditions to build are: 
- current branch starts with `beta/`
- local branch is clean, with no local changes

2. Build process has 4 steps (lanes), as can be seen in `fastlane/fast.rb`
- version lane: will creat a new version, update package.json and platform specific files, both iOS and Android
- build lane: will do the actual build and sign the iOS IPA file
- send to TestFlight lane: this will upload the IPA file to TestFlight for app with ID: `socialxnetwork`
- bugsnag lane: this will exectue script `./ios-bugsnag.sh` that uploads sourcemaps and minified JS file 
to BugSnag for error reporting.

3. After build: you can commit the changes with the new version, on the beta branch.