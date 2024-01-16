import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { PersistentIssue } from '../../types/Models'
import { statusTranslation } from '../../helper'
import { FC, use, useEffect } from 'react'

const statuses = {
  in_progress: 'text-gray-500 bg-gray-100/10',
  done: 'text-green-400 bg-green-400/10',
  open: 'text-rose-400 bg-rose-400/10',
}
const badges = {
  open: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  in_progress: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
  done: 'text-green-400 bg-green-400/10 ring-green-400/20',
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface TicketListProps {
  tickets: PersistentIssue[] | undefined
  setActiveTicket: (ticket: PersistentIssue) => void
  activeTicket: PersistentIssue | undefined
}

const TicketList: FC<TicketListProps> = ({
  tickets,
  setActiveTicket,
  activeTicket,
}) => {
  useEffect(() => {
    if (tickets) setActiveTicket(tickets[0])
  }, [])

  return (
    <ul role="list" className="divide-y divide-white/5">
      {tickets?.map((ticket: PersistentIssue) => (
        <li
          key={ticket.id}
          className={
            ticket.id == activeTicket?.id
              ? 'rounded-md bg-gray-400/20 px-4 py-4 relative flex items-center space-x-4 py-4'
              : 'relative flex items-center space-x-4 px-4 py-4'
          }
          onClick={() => setActiveTicket(ticket)}
        >
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              {ticket.status ? (
                <div
                  className={classNames(
                    statuses[ticket.status],
                    'flex-none rounded-full p-1',
                  )}
                >
                  <div className="h-2 w-2 rounded-full bg-current" />
                </div>
              ) : null}
              <h2 className="min-w-0 text-sm font-semibold leading-6 ">
                <span className="flex gap-x-2">
                  <span className="truncate">{ticket.title}</span>
                  <span className="text-gray-400">/</span>
                  <span className="whitespace-nowrap">{ticket.issueType}</span>
                  <span className="absolute inset-0" />
                </span>
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
              <p className="truncate">{ticket.description}</p>
              <svg
                viewBox="0 0 2 2"
                className="h-0.5 w-0.5 flex-none fill-gray-300"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="whitespace-nowrap">{ticket.storyPoints}</p>
            </div>
          </div>
          {ticket.status ? (
            <div
              className={classNames(
                badges[ticket.status],
                'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset',
              )}
            >
              {statusTranslation(ticket.status)}
            </div>
          ) : null}
          <ChevronRightIcon
            className="h-5 w-5 flex-none text-gray-400"
            aria-hidden="true"
          />
        </li>
      ))}
    </ul>
  )
}

export default TicketList
