#!/bin/bash
# 
# Command to build the keg-sessions component with in the tap docker container, then copy to the host sessionBuild folder
# This ensures a consistent environment when compiling the component
# At somepoint we could also automate pushing the component to NPM / Github / etc..
# 

TAP_NAME=consumer
DOC_SOURCE_PATH=/keg/app/build

if [[ -z "$KEG_CLI_PATH" ]]; then
  echo "[ KEG ERROR ] Keg-CLI path not set! Ensure the env \"KEG_CLI_PATH\" is set before running this command!" >&2
  exit 1
fi

# Ensure the keg-cli is loaded
source $KEG_CLI_PATH/keg

# Move to the keg-test-consumer directory
keg $TAP_NAME

# Path to the taps local build folder
LOCAL_BUILD_DIR=$(pwd)/build

# Remove the local build folder if it exists
if [[ -d "$LOCAL_BUILD_DIR" ]]; then
  rm -rf $LOCAL_BUILD_DIR
fi

# Run the build command in the tap docker container
keg $TAP_NAME docker ex workdir=/keg/app cmd=\"yarn build:local\"

# Command to build keg-component, and copy it from the docker container
# This is just to test building keg-components to ensure changes are reflected in that build
keg $TAP_NAME docker cp source=docker remote=$DOC_SOURCE_PATH local=$LOCAL_BUILD_DIR
