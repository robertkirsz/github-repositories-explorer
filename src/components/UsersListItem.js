import { useState } from 'react'
import styled from 'styled-components'

import store from 'store'
import { fetchUserRepos } from 'reducers/users'
import ReposList from 'components/ReposList'
import Chevron from 'components/Chevron'

export default function UsersListItem({ user = {} }) {
  const [isOpened, setIsOpened] = useState(false)

  function handleClick() {
    setIsOpened(state => !state)
    if (!user.repos) store.dispatch(fetchUserRepos(user.login))
  }

  return (
    <>
      <Wrapper onClick={handleClick}>
        <span>{user.login}</span>
        <Chevron isActive={isOpened} />
      </Wrapper>

      {isOpened && <ReposList repos={user.repos} />}
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  background: lightgray;
  border: 1px solid;
`
