import React from 'react'
import Sessions from '@keg-hub/tap-evf-sessions'
import testData from './mocks/testData'

function App() {
  return <Sessions 
    disableDemo={false} 
    sessionAgendaProps={testData} 
  />
}

export default App;
