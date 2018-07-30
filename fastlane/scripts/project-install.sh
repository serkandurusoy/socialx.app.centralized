#!/usr/bin/env bash

echo "Step 1: delete node_modules"
rm -rf node_modules

echo "Step 2: yarn install"
yarn install

echo "Step 3: iOS pod install"
cd ios
rm -rf Pods
pod install
