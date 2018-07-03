#!/usr/bin/env bash

if [ -n ${APPCENTER_ANDROID_VARIANT} ]; then
    uploadAndroid
else
    echo 'TODO: iOS build'
fi

uploadAndroid() {
    ROOT_DIR=${APPCENTER_SOURCE_DIRECTORY}
    echo "App root dir ${ROOT_DIR}"

    API_KEY='73245fce110f157e3c5ba0c2ac7154ae'
    ANDROID_BUNDLE_NAME='android-release.bundle' # look for 'bundleAssetName' in android/app/build.gradle
    ANDROID_MAP_NAME='android-release.bundle.map' # look for '--sourcemap-output' in android/app/build.gradle
    MINIFIED_FILE="${ROOT_DIR}/android/app/build/intermediates/assets/release/${ANDROID_BUNDLE_NAME}"
    SOURCE_MAP_FILE="${ROOT_DIR}${ANDROID_MAP_NAME}"
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