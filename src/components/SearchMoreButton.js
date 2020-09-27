import { useSelector } from 'react-redux'
import store from 'store'
import { fetchUsers } from 'reducers/users'

export default function SearchMoreButton() {
  const { items, lastSearchedUsername, isUsernameBeingSearched } = useSelector(({ users }) => users)

  function searchMore() {
    if (lastSearchedUsername) store.dispatch(fetchUsers({ username: lastSearchedUsername, searchMore: true }))
  }

  if (!items.length || lastSearchedUsername === '') return null

  return (
    <button disabled={isUsernameBeingSearched} onClick={searchMore} css="align-self: center;">
      Search more
    </button>
  )
}
