import React, {useState, useMemo, useCallback} from 'react'
import Sessions from '@keg-hub/tap-evf-sessions'
import testData from './mocks/testData'
import { evfModalBuilder } from './mocks/evfModalBuilder'
import { useRGA4 } from '@keg-hub/rga4'

const onBookingRequest = (sessionId, ids) => {
  console.log('Booking request for session ', sessionId, 'with attendees: ', ids)
  return new Promise(resolve => setTimeout(resolve, 1000))
}

const onWaitingRequest = (sessionId, ids) => {
  console.log('Booking request for session ', sessionId, 'with attendees: ', ids)
  return new Promise(resolve => setTimeout(resolve, 1000))
}

export const EvfSessions = props => {
  const rga4 = useRGA4()

  const [modalParentProps] = useState({ className: 'evf-modal' })

  const SessionsModal = useMemo(() => {
    return evfModalBuilder(modalParentProps)
  }, [modalParentProps])

  const bookingRequest = useCallback((sessionId, ids) => {
    rga4.event({
      name: 'booking_request',
      session_id: sessionId,
      ids: ids,
    })
    return onBookingRequest(sessionId, ids)
  }, [rga4])

  const waitingRequest = useCallback((sessionId, ids) => {
    rga4.event({
      name: 'waiting_request',
      session_id: sessionId,
      ids: ids,
    })
    return onWaitingRequest(sessionId, ids)
  }, [rga4])

  return <Sessions 
    disableDemo={false}
    onSessionBookingRequest={bookingRequest}
    onSessionWaitingListRequest={waitingRequest}
    sessionAgendaProps={testData} 
    ModalComponent={SessionsModal}
  />
}

