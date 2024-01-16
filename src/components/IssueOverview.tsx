"use client"
import { use, useEffect, useState } from 'react'
import { PersistentIssue } from '../../types/Models'
import EmptyState from './EmptyState'
import TicketDetail from './TicketDetail'
import TicketList from './TicketList'
import useSWR from 'swr'
import toast from 'react-hot-toast'

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => data.response)

const IssueOverview = () => {
  const [activeTicket, setActiveTicket] = useState<PersistentIssue | undefined>(
    undefined,
  )
  const url = 'http://localhost:3000/api/tickets'
  const { data, isLoading, mutate, error } = useSWR(
    url,
    (url) => fetcher(url),
    {
      fallbackData: [],
    },
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data.length) {
    return (
      <EmptyState
        title="No Issues"
        description="Get started by uploading a new meeting transcription."
        href="/fileupload"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    )
  }

  const removeTicket = async (ticketId: string) => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE',
      })

      if (res.status === 204) {
        mutate()
      } else {
        throw new Error('Processing failed')
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <main className="lg:pl-20">
        <div className="xl:pl-96">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <TicketDetail ticket={activeTicket} deleteTicket={removeTicket} />
          </div>
        </div>
      </main>
      <aside className="fixed inset-y-0 left-20 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <TicketList
            tickets={data}
            setActiveTicket={setActiveTicket}
            activeTicket={activeTicket}
          />
        )}
      </aside>
    </>
  )
}

export default IssueOverview
