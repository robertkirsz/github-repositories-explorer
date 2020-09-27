import { useState } from 'react'
import Div from 'styled-kit/Div'
import SearchInput from 'components/SearchInput'
import UsersList from 'components/UsersList'
import SearchInfo from 'components/SearchInfo'

export default function App() {
  const [username, setUsername] = useState('')

  return (
    <Div column listTop width="100%" maxWidth={480} padding={8} css="overflow: hidden;">
      <h1 css="text-align: center">GitHub Repositories Explorer</h1>
      <SearchInput onChange={setUsername} />
      <SearchInfo username={username} />
      <UsersList />
    </Div>
  )
}
