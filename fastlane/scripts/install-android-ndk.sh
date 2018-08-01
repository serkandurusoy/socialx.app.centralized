#!/usr/bin/env bash
# Reverts the Android NDK version to r16b from r17 to resolve a react native compile issue:
# https://github.com/facebook/react-native/issues/19321
# https://github.com/android-ndk/ndk/issues/700

NDK_VERSION=$(grep "Pkg.Revision" ${ANDROID_HOME}/ndk-bundle/source.properties | cut -d'=' -f2)
NDK_VERSION="$(echo -e "${NDK_VERSION}" | tr -d '[:space:]')" # just remove leading and trailing spaces

ANDROID_NDK_VERSION='r16b'
NDK_ZIP_FILE="android-ndk-${ANDROID_NDK_VERSION}-darwin-x86_64.zip"
DOWNLOAD_TEMP_DIR="${TMPDIR}/android-ndk-tmp"
NDK_DESTINATION_DIR="${ANDROID_HOME}/ndk-bundle"

if [[ "$NDK_VERSION" == 16.1.* ]]; then
    echo "Android NDK correct version found"
else
    # wanted NDK version
    NDK_DOWNLOAD_URL="https://dl.google.com/android/repository/${NDK_ZIP_FILE}"

    # create a temp working directory
    mkdir ${DOWNLOAD_TEMP_DIR}
    cd ${DOWNLOAD_TEMP_DIR}

    # download ndk
    curl ${NDK_DOWNLOAD_URL} --output ${NDK_ZIP_FILE}

    # uncompress
    unzip -o ${NDK_ZIP_FILE}

    # move to its final location
    rm -rf "${NDK_DESTINATION_DIR}/*"
    mkdir -p ${NDK_DESTINATION_DIR}
    cp -rf ./android-ndk-${ANDROID_NDK_VERSION}/* ${NDK_DESTINATION_DIR}

    # remove temp dir
    cd ..
    rm -rf ${DOWNLOAD_TEMP_DIR}
fi