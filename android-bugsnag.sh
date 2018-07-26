#!/usr/bin/env bash

# TODO: this was not updated

API_KEY='73245fce110f157e3c5ba0c2ac7154ae'
ANDROID_BUNDLE_NAME='index.android.bundle' # look for 'bundleAssetName' in android/app/build.gradle
ANDROID_MAP_NAME='index.android.bundle.map' # look for '--sourcemap-output' in android/app/build.gradle
MINIFIED_FILE="${ROOT_DIR}/android/app/build/intermediates/assets/release/${ANDROID_BUNDLE_NAME}"
SOURCE_MAP_FILE="${ROOT_DIR}/${ANDROID_MAP_NAME}"

echo "Minified file: ${MINIFIED_FILE}"
echo "Source map file: ${SOURCE_MAP_FILE}"

cd ${ROOT_DIR}

./node_modules/bugsnag-sourcemaps/cli.js upload \
        --api-key ${API_KEY} \
        --minified-file ${MINIFIED_FILE} \
        --source-map ${SOURCE_MAP_FILE} \
        --minified-url index.android.bundle \
        --upload-sources