#!/usr/bin/env bash
# Reverts the Android NDK version to r16b from r17 to resolve a react native compile issue:
# https://github.com/facebook/react-native/issues/19321
# https://github.com/android-ndk/ndk/issues/700

set -ex

# set env vars
export ANDROID_NDK_VERSION='r16b'

# create a temp working directory
mkdir ./android-ndk-tmp
cd ./android-ndk-tmp

# download ndk
wget -q https://dl.google.com/android/repository/android-ndk-$ANDROID_NDK_VERSION-darwin-x86_64.zip

# uncompress
unzip -o android-ndk-$ANDROID_NDK_VERSION-darwin-x86_64.zip

# move to its final location
mv ./android-ndk-$ANDROID_NDK_VERSION $ANDROID_HOME/ndk-bundle

# remove temp dir
cd ..
rm -rf ./android-ndk-tmp

# add to PATH
export PATH=${PATH}:$ANDROID_HOME/ndk-bundle