# Overview
Simple app for testing out keg builds in a consumer environment. Made with create-react-app.

Go to [App.js](https://github.com/simpleviewinc/keg-test-consumer/blob/master/src/App.js) to see the source code that calls the `tap-evf-sessions` component.

## Usage

### Testing the `tap-evf-sessions` package from NPM
1. `yarn install`
2. `yarn start`

### Testing your local `tap-events-force` in the keg-cli docker environment
1. `keg consumer start`
  * starts the container itself, but not the react app yet, with the consumer mounted at `keg/app`
2. `keg consumer sync evf:install:start`
  * syncs your local tap-events-force into the container at `/keg/tap`, then starts the build server, which will rebuild the sessions component whenever a change is detected. It will automatically
    place it inside of the consumer's `/keg/app/node_modules/@keg-hub/tap-evf-sessions` 
3. `keg consumer att`
  * attach to the consumer container
4. `yarn start`
  * starts the react app, with hot-reloading reacting to new builds

> Note: when following these instructions, replace `consumer` and `evf` with your local keg-cli link aliases for keg-test-consumer and tap-events-force respectively
