# SocialX project for mobile app

## Distributing signed builds using [AppCenter](https://appcenter.ms/apps)

Signing configuration is required for each branch we want to use for distributing test builds.

**Android:** All the setup for signing the APK is already made. In AppCenter just enable 'Sign builds' and check 
'My Gradle settings are entirely set to handle signing automatically'

**iOS:** Here after enabling 'Sign builds' one must upload provisioning profile and exported .p12 certificate.
Those can be found in Google Drive folder 'Corporate Identity/iOS signing files'. Password for p12 file is 'SocX2018' 
 