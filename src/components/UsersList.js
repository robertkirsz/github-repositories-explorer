import { useSelector } from 'react-redux'
import Div from 'styled-kit/Div'
import UsersListItem from 'components/UsersListItem'

export default function UsersList() {
  const users = useSelector(state => state.users.items)

  return (
    <Div column listTop css="overflow: auto;" role="users-list">
      {users.map(user => (
        <UsersListItem key={user.id} user={user} />
      ))}
    </Div>
  )
}
