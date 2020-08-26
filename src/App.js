import React from 'react'
import Sessions from '@keg-hub/tap-evf-sessions'
import testData from './mocks/testData'
// For CJS: import Sessions from '@simpleviewinc/tap-events-force/keg-sessions.cjs'

function App() {
  return <Sessions {...testData} />
}

export default App;
