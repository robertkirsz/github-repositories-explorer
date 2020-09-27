import Div from 'styled-kit/Div'
import store from 'store'
import { fetchUsers, clearUsers } from 'reducers/users'
import DebouncedInput from 'components/DebouncedInput'
import UsersList from 'components/UsersList'
import SearchInfo from 'components/SearchInfo'
import SearchMoreButton from 'components/SearchMoreButton'
import { useSelector } from 'react-redux'

export default function App() {
  const { lastSearchedUsername } = useSelector(({ users }) => users)

  function handleSearch(username) {
    if (username) store.dispatch(fetchUsers({ username }))
    else store.dispatch(clearUsers())
  }

  return (
    <Div column listTop width="100%" maxWidth={480} padding={8} css="overflow: hidden;">
      <h1 css="text-align: center;">GitHub Repositories Explorer</h1>
      <DebouncedInput placeholder="Enter username" value={lastSearchedUsername} onChange={handleSearch} />
      <SearchInfo />
      <UsersList />
      <SearchMoreButton />
    </Div>
  )
}
