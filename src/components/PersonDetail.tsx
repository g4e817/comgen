import { FC, useEffect, useState } from 'react'
import { PersistentUser } from '../../types/Models'
import { statusTranslation } from '../../helper'
import { User } from '../../types/User'
import { Button } from './catalyst/button'

interface INFTicketDetailProps {
  user: PersistentUser | undefined
  deleteUser: (id: string) => void
}

const PersonDetail: FC<INFTicketDetailProps> = ({ user, deleteUser }) => {
  if (!user) return <p>No Person selected.</p>

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
        <Button onClick={() => deleteUser(user.id)} color="red">
          Delete
        </Button>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              E-Mail
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {user.email}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Role
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.role}
            </dd>
          </div>
          {/* TODO assign to alias for ticket assigning*/}
        </dl>
      </div>
    </>
  )
}

export default PersonDetail
