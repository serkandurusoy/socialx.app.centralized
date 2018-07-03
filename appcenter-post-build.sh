#!/usr/bin/env bash

API_KEY='73245fce110f157e3c5ba0c2ac7154ae'
ROOT_DIR=${APPCENTER_SOURCE_DIRECTORY}
SOURCE_DIR=${APPCENTER_SOURCE_DIRECTORY}
BUILD_ID=${APPCENTER_BUILD_ID}
echo "App root dir ${ROOT_DIR}"

uploadAndroid() {
    ANDROID_BUNDLE_NAME='index.android.bundle' # look for 'bundleAssetName' in android/app/build.gradle
    ANDROID_MAP_NAME='index.android.bundle.map' # look for '--sourcemap-output' in android/app/build.gradle
    MINIFIED_FILE="${ROOT_DIR}/android/app/build/intermediates/assets/release/${ANDROID_BUNDLE_NAME}"
    SOURCE_MAP_FILE="${ROOT_DIR}/${ANDROID_MAP_NAME}"
    ANDROID_APP_VERSION=$((BUILD_ID  * 10 + 1))

    echo "Minified file: ${MINIFIED_FILE}"
    echo "Source map file: ${SOURCE_MAP_FILE}"

    cd ${ROOT_DIR}
    ./node_modules/bugsnag-sourcemaps/cli.js upload \
        --api-key ${API_KEY} \
        --app-version ${ANDROID_APP_VERSION} \
        --minified-file ${MINIFIED_FILE} \
        --source-map ${SOURCE_MAP_FILE} \
        --minified-url index.android.bundle \
        --upload-sources
}

uploadIOS() {
    IOS_BUNDLE_NAME='main.jsbundle'
    IOS_MAP_NAME='index.ios.map' # not sure about the path here...
    MINIFIED_FILE="${SOURCE_DIR}/${IOS_BUNDLE_NAME}"
    SOURCE_MAP_FILE="${ROOT_DIR}/${IOS_MAP_NAME}"
    IOS_APP_VERSION=$((BUILD_ID  * 10 + 2))

    echo 'Listing ROOT_DIR'
    ls -la ${ROOT_DIR}

    echo "Minified file: ${MINIFIED_FILE}"
    echo "Source map file: ${SOURCE_MAP_FILE}"

    cd ${ROOT_DIR}
    ./node_modules/bugsnag-sourcemaps/cli.js upload \
        --api-key ${API_KEY} \
        --app-version ${IOS_APP_VERSION} \
        --minified-file ${MINIFIED_FILE} \
        --source-map ${SOURCE_MAP_FILE} \
        --minified-url main.jsbundle \
        --upload-sources
}

if [ -n "${APPCENTER_XCODE_SCHEME}" ]; then
    echo 'Now uploadIOS'
    uploadIOS
else
    echo 'Now uploadAndroid'
    uploadAndroid
fi