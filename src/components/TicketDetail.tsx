import { FC, useEffect, useState } from 'react'
import { PersistentIssue } from '../../types/Models'
import { statusTranslation } from '../../helper'
import { User } from '../../types/User'
import { Button } from './catalyst/button'

interface INFTicketDetailProps {
  ticket: PersistentIssue | undefined
  deleteTicket: (id: string) => void
}

const TicketDetail: FC<INFTicketDetailProps> = ({ ticket, deleteTicket }) => {
  if (!ticket) return <p>No Issue selected.</p>

  const [ticketAssignee, setTicketAssignee] = useState<string | null>(null)

  const getAssignee = async (assigne_id: string | undefined) => {
    if (!assigne_id) return setTicketAssignee('Not assigned')
    const res = await fetch(`/api/users/${ticket.assignee_id}`)
    const data = (await res.json()).response
    const user = data as User
    setTicketAssignee(user.name)
  }

  useEffect(() => {
    getAssignee(ticket?.assignee_id)
  }, [ticket])

  return (
    <>
      <div className="px-4 sm:px-0 flex justify-between items-center">
        <span>
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Issue Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Issue details
          </p>
        </span>
        <Button onClick={() => deleteTicket(ticket.id)} color="red">
          Delete
        </Button>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Issue Title
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {ticket?.title}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Description
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {ticket?.description}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Assigne
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {ticketAssignee}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Status
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {statusTranslation(ticket?.status ?? '')}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Story Points
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {ticket?.storyPoints ?? 'Not assigned'}
            </dd>
          </div>
        </dl>
      </div>
    </>
  )
}

export default TicketDetail
