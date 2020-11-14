import React, {useState, useMemo} from 'react'
import Sessions from '@keg-hub/tap-evf-sessions'
import testData from './mocks/testData'
import { evfModalBuilder } from './mocks/evfModalBuilder'

import "bootstrap/dist/css/bootstrap.min.css"

const onBookingRequest = (sessionId, ids) => {
  console.log('Booking request for session ', sessionId, 'with attendees: ', ids)
}

const onWaitingRequest = (sessionId, ids) => {
  console.log('Booking request for session ', sessionId, 'with attendees: ', ids)
}

function App() {
  const [modalParentProps] = useState({ className: 'evf-modal' })

  const SessionsModal = useMemo(() => {
    return evfModalBuilder(modalParentProps)
  }, [modalParentProps])

  return <Sessions 
    onSessionBookingRequest={onBookingRequest}
    onSessionWaitingListRequest={onWaitingRequest}
    sessionAgendaProps={testData} 
    ModalComponent={SessionsModal}
  />
}

export default App;
