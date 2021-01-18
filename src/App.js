import React from 'react'
import { RGA4Provider } from '@keg-hub/rga4'
import { EvfSessions } from './EvfSessions'

import "bootstrap/dist/css/bootstrap.min.css"

const ga4Config = { debug_mode: true }

const App = () => {
  return (
    <RGA4Provider code={'G-W0DPH3TXHV'} config={ga4Config} >
      <EvfSessions />
    </RGA4Provider>
  )
}

export default App;
