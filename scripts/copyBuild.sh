#!/bin/bash

ID="$1"

docker cp "$ID":/keg/tap/build/package.json ./node_modules/@simpleviewinc/tap-events-force

docker cp "$ID":/keg/tap/build/keg-sessions.esm.js ./node_modules/@simpleviewinc/tap-events-force