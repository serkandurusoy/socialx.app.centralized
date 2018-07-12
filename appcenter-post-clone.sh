#!/usr/bin/env bash

set -ex
brew uninstall node@6

NODE_VERSION="8.11.3"
DOWNLOAD_URL="https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.pkg"
INSTALLER_PATH="$HOME/Downloads/node-installer.pkg"

curl ${DOWNLOAD_URL} > ${INSTALLER_PATH}
sudo installer -store -pkg ${INSTALLER_PATH} -target "/"