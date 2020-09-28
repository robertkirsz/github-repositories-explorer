import { useSelector } from 'react-redux'
import Div from 'styled-kit/Div'
import UsersListItem from 'components/UsersListItem'

export default function UsersList() {
  const users = useSelector(state => state.users.items)

  return (
    <Div column listTop mobile="overflow: auto;">
      {users.map(user => (
        <UsersListItem key={user.id} user={user} />
      ))}
    </Div>
  )
}
