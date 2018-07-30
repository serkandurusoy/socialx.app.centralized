#!/usr/bin/env bash

API_KEY='73245fce110f157e3c5ba0c2ac7154ae'

IOS_BUNDLE_NAME='main.jsbundle'
IOS_MAP_NAME='index.ios.map'

./node_modules/bugsnag-sourcemaps/cli.js upload \
 --api-key ${API_KEY} \
 --minified-file ${IOS_BUNDLE_NAME} \
 --source-map ${IOS_MAP_NAME} \
 --minified-url main.jsbundle \
 --upload-sources