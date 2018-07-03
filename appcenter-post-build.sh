#!/usr/bin/env bash

API_KEY='73245fce110f157e3c5ba0c2ac7154ae'
ROOT_DIR=${APPCENTER_SOURCE_DIRECTORY}
OUTPUT_DIR=${APPCENTER_OUTPUT_DIRECTORY}
echo "App root dir ${ROOT_DIR}"

uploadAndroid() {
    ANDROID_BUNDLE_NAME='android-release.bundle' # look for 'bundleAssetName' in android/app/build.gradle
    ANDROID_MAP_NAME='android-release.bundle.map' # look for '--sourcemap-output' in android/app/build.gradle
    MINIFIED_FILE="${ROOT_DIR}/android/app/build/intermediates/assets/release/${ANDROID_BUNDLE_NAME}"
    SOURCE_MAP_FILE="${ROOT_DIR}/${ANDROID_MAP_NAME}"
    APP_VERSION='1.0.6'

    echo 'About to upload sourcemaps to BugSnag'
    echo "Minified file: ${MINIFIED_FILE}"
    echo "Source map file: ${SOURCE_MAP_FILE}"

    cd ${ROOT_DIR}
    ./node_modules/bugsnag-sourcemaps/cli.js upload \
        --api-key YOUR_API_KEY_HERE \
        --app-version ${APP_VERSION} \
        --minified-file ${MINIFIED_FILE} \
        --source-map ${SOURCE_MAP_FILE} \
        --minified-url index.android.bundle \
        --upload-sources

    echo 'BugSnag upload complete'
}

uploadIOS() {
    IOS_BUNDLE_NAME='main.jsbundle'
    IOS_MAP_NAME='index.ios.map' # not sure about the path here...
    MINIFIED_FILE="${OUTPUT_DIR}/${IOS_BUNDLE_NAME}"
    SOURCE_MAP_FILE="${ROOT_DIR}/${IOS_MAP_NAME}"
    APP_VERSION='1.0.6'

    echo 'Listing ROOT_DIR'
    ls -la ${ROOT_DIR}

    echo 'About to upload sourcemaps to BugSnag'
    echo "Minified file: ${MINIFIED_FILE}"
    echo "Source map file: ${SOURCE_MAP_FILE}"

    cd ${ROOT_DIR}
    ./node_modules/bugsnag-sourcemaps/cli.js upload \
        --api-key YOUR_API_KEY_HERE \
        --app-version ${APP_VERSION} \
        --minified-file ${MINIFIED_FILE} \
        --source-map ${SOURCE_MAP_FILE} \
        --minified-url main.jsbundle \
        --upload-sources

    echo 'BugSnag upload complete'
}

if [ -n "${APPCENTER_XCODE_SCHEME}" ]; then
    echo 'Now uploadIOS'
    uploadIOS
else
    echo 'Now uploadAndroid'
    uploadAndroid
fi