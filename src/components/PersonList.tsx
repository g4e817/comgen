import { PersistentUser } from '../../types/Models'
import { FC, useEffect } from 'react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface TicketListProps {
  users: PersistentUser[] | undefined
  setActiveUser: (ticket: PersistentUser) => void
  activeUser: PersistentUser | undefined
}

const PersonList: FC<TicketListProps> = ({
  users,
  setActiveUser,
  activeUser
}) => {
  useEffect(() => {
    if (users) setActiveUser(users[0])
  }, [])

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {users?.map((user: PersistentUser) => (
        <li
          key={user.email}
          className={
            user.id == activeUser?.id
              ? 'rounded-md bg-gray-400/20 flex gap-x-4 py-5 px-4 relative items-center space-x-4'
              : 'relative flex items-center space-x-4 gap-x-4 py-5 px-4'
          }
          onClick={() => setActiveUser(user)}
        >
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={'/janiboy.png'}
            alt=""
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {user.name}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {user.email}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default PersonList
