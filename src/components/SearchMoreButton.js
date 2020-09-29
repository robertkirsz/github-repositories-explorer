import { useSelector } from 'react-redux'
import styled from 'styled-components'
import store from 'store'
import { fetchUsers } from 'reducers/users'
import { queries } from 'styles'

export default function SearchMoreButton() {
  const { items, lastSearchedUsername, isUsernameBeingSearched } = useSelector(({ users }) => users)

  function searchMore() {
    if (lastSearchedUsername) store.dispatch(fetchUsers({ username: lastSearchedUsername, searchMore: true }))
  }

  if (!items.length || lastSearchedUsername === '') return null

  return (
    <Button disabled={isUsernameBeingSearched} onClick={searchMore} css="align-self: center;">
      Show more
    </Button>
  )
}

const Button = styled.button`
  opacity: 0.6;
  text-align: center;
  text-decoration: underline;
  background: none;
  outline: none;
  cursor: pointer;
  border: none;
  ${queries.mobile`margin-top: auto;`}
`
