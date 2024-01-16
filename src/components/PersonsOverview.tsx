"use client"
import { use, useEffect, useState } from 'react'
import { PersistentIssue, PersistentUser } from '../../types/Models'
import EmptyState from './EmptyState'

import useSWR from 'swr'
import toast from 'react-hot-toast'
import PersonDetail from './PersonDetail'
import PersonList from './PersonList'
import CreateUserModal from './CreateUserModal'
import { User } from '../../types/User'

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => data.response)

const PersonsOverview = () => {
  const [activeUser, setActiveUser] = useState<PersistentUser | undefined>(
    undefined,
  )

  const [createNewUser, setCreateNewUser] = useState<boolean>(false)
  const url = 'http://localhost:3000/api/users'
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

  const removePerson = async (ticketId: string) => {
    try {
      const res = await fetch(`/api/users/${ticketId}`, {
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

  const createUser = async (user: User) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const res = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify(user),
        })
        const data = await res.json()
        if (res.status === 201) {
          mutate()
          resolve()
        } else {
          reject(data)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  return (
    <>
      <div>
        <main className="lg:pl-20">
          <div className="xl:pl-96">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              <PersonDetail user={activeUser} deleteUser={removePerson} />
            </div>
          </div>
        </main>
        <aside className="fixed inset-y-0 left-20 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
          <div className="text-right bg-gray-800 p-4 rounded-xl mb-4 justify-end">
            <button
              type="button"
              className="ml-3 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={() => setCreateNewUser(true)}
            >
              Create new user
            </button>
          </div>
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <PersonList
              users={data}
              setActiveUser={setActiveUser}
              activeUser={activeUser}
            />
          )}
        </aside>
      </div>
      <CreateUserModal
        open={createNewUser}
        setOpen={setCreateNewUser}
        createUser={createUser}
      />
    </>
  )
}

export default PersonsOverview
