import store from 'store'
import { fetchUsers, clearUsers } from 'reducers/users'
import DebouncedInput from 'components/DebouncedInput'
import { useSelector } from 'react-redux'

export default function SearchUsersInput() {
  const { lastSearchedUsername } = useSelector(({ users }) => users)

  function handleSearch(username) {
    if (username) store.dispatch(fetchUsers({ username }))
    else store.dispatch(clearUsers())
  }

  return (
    <DebouncedInput
      placeholder="Enter username"
      value={lastSearchedUsername}
      onChange={handleSearch}
      css="align-self: center;"
    />
  )
}
