import { useSelector } from 'react-redux'

export default function UsersList() {
  const users = useSelector(state => state.users.items)
  const isRequestPending = useSelector(state => state.users.pending)

  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
      {isRequestPending ? <p>Searching</p> : null}
    </>
  )
}
