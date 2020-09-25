import { useSelector } from 'react-redux'
import styled from 'styled-components'

import UsersListItem from 'components/UsersListItem'
import RequestStatusOverlay from 'components/RequestStatusOverlay'

export default function UsersList() {
  const users = useSelector(state => state.users.items)

  return (
    <Wrapper>
      {users.map(user => (
        <UsersListItem key={user.id} user={user} />
      ))}

      <RequestStatusOverlay />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`
