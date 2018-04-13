# SocialX project for mobile app

## Work flow and getting started
1. Clone this repo then checkout the development branch with `git checkout development`
2. Create a new branch specific to the task you have, and make the name of the branch informative, eg: `git checkout -b "feature/user-friend-logic"`
3. Make sure you are following the code style and make sure you have linting on
4. Before pushing your changes always make sure to run `npm run precommit` if it doesnt run before you commit
5. After wrapping and finishing the task, create a pull request to the `development` branch accordingly, afterwards a core team member will review the changes and approve/fixup/report the changes

## Distributing signed builds using [AppCenter](https://appcenter.ms/apps)

Signing configuration is required for each branch we want to use for distributing test builds.

**Android:** All the setup for signing the APK is already made. In AppCenter just enable 'Sign builds' and check 
'My Gradle settings are entirely set to handle signing automatically'

**iOS:** Here after enabling 'Sign builds' one must upload provisioning profile and exported .p12 certificate.
Those can be found in Google Drive folder 'Corporate Identity/iOS signing files'. Password for p12 file is 'SocX2018' 
 