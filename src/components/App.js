import { useState } from 'react'
import Div from 'styled-kit/Div'
import store from 'store'
import { fetchUsers, clearUsers } from 'reducers/users'
import DebouncedInput from 'components/DebouncedInput'
import UsersList from 'components/UsersList'
import SearchInfo from 'components/SearchInfo'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')

  function handleSearch(value) {
    setSearchQuery(value)
    if (value) store.dispatch(fetchUsers(value))
    else store.dispatch(clearUsers())
  }

  return (
    <Div column listTop width="100%" maxWidth={480} padding={8} css="overflow: hidden;">
      <h1 css="text-align: center">GitHub Repositories Explorer</h1>
      <DebouncedInput placeholder="Enter username" value={searchQuery} onChange={handleSearch} />
      <SearchInfo username={searchQuery} />
      <UsersList />
    </Div>
  )
}
