import React, {useState, useMemo} from 'react'
import Sessions from '@keg-hub/tap-evf-sessions'
import testData from './mocks/testData'
import { evfModalBuilder } from './mocks/evfModalBuilder'

import "bootstrap/dist/css/bootstrap.min.css"

const onBookingRequest = (sessionId, ids) => {
  console.log('Booking request for session ', sessionId, 'with attendees: ', ids)
  return new Promise(resolve => setTimeout(resolve, 1000))
}

const onWaitingRequest = (sessionId, ids) => {
  console.log('Booking request for session ', sessionId, 'with attendees: ', ids)
  return new Promise(resolve => setTimeout(resolve, 1000))
}

function App() {
  const [modalParentProps] = useState({ className: 'evf-modal' })

  const SessionsModal = useMemo(() => {
    return evfModalBuilder(modalParentProps)
  }, [modalParentProps])

  return <Sessions 
    disableDemo={false}
    onSessionBookingRequest={onBookingRequest}
    onSessionWaitingListRequest={onWaitingRequest}
    sessionAgendaProps={testData} 
    ModalComponent={SessionsModal}
  />
}

export default App;
