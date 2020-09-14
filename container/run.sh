#!/usr/bin/env

export SUPPRESS_SUPPORT=1
export KEG_CONSUMER_BUILD_PATH=/keg/app/@keg-hub/

APP_PATH=/keg/app

# If DOC_APP_PATH env is passed override the default app path
if [[ "$DOC_APP_PATH" ]]; then
  APP_PATH="$DOC_APP_PATH"
fi

# Helper to print a message to the terminal
keg_message(){
  echo $"[ KEG-CLI ] $1" >&2
  return
}

# Runs yarn install at run time
# Use when adding extra node_modules to keg-core without rebuilding
keg_run_app_yarn_setup(){

  # Check if $KEG_NM_INSTALL exist, if it doesn't, then return
  if [[ -z "$KEG_NM_INSTALL" ]]; then
    return
  fi

  # Navigate to the app directory, and run the yarn install here
  cd $APP_PATH

  keg_message "Running yarn install for keg-test-consumer..."
  yarn install

}

# Runs a yarn command from the package.json
keg_run_the_app(){

  cd $APP_PATH

  KEG_EXEC_CMD="start"
  keg_message "Running command 'yarn $KEG_EXEC_CMD'"
  yarn $KEG_EXEC_CMD
}

# If the no KEG_DOCKER_EXEC env is set, just sleep forever
# This is to keep our container running forever
if [[ -z "$KEG_DOCKER_EXEC" ]]; then
  tail -f /dev/null
  exit 0
fi
