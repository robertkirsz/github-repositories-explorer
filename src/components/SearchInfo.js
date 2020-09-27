import { useSelector } from 'react-redux'
import InfoMessage from 'components/InfoMessage'

export default function SearchInfo({ username = '' }) {
  const users = useSelector(state => state.users.items)
  const isUsernameBeingSearched = useSelector(state => state.users.isUsernameBeingSearched)

  if (isUsernameBeingSearched) return <InfoMessage center>Loading...</InfoMessage>

  if (username)
    return <InfoMessage>{users.length ? `Showing users for "${username}"` : `No users to display`}</InfoMessage>

  return null
}
