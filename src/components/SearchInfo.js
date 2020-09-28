import { useSelector } from 'react-redux'
import InfoMessage from 'components/InfoMessage'

export default function SearchInfo() {
  const { items, lastSearchedUsername, isUsernameBeingSearched } = useSelector(({ users }) => users)

  if (isUsernameBeingSearched) return <InfoMessage>Loading...</InfoMessage>

  if (lastSearchedUsername) {
    return (
      <InfoMessage>{items.length ? `Showing users for "${lastSearchedUsername}"` : `No users to display`}</InfoMessage>
    )
  }

  return null
}
