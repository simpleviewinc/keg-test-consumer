import React from 'react'
import Sessions from '@keg-hub/tap-evf-sessions'
import testData from './mocks/testData'

const onBookingRequest = (sessionId, ids) => {
  console.log('Booking request for session ', sessionId, 'with attendees: ', ids)
}

const onWaitingRequest = (sessionId, ids) => {
  console.log('Booking request for session ', sessionId, 'with attendees: ', ids)
}

function App() {
  return <Sessions 
    disableDemo={true} 
    onSessionBookingRequest={onBookingRequest}
    onSessionWaitingListRequest={onWaitingRequest}
    sessionAgendaProps={testData} 
  />
}

export default App;
