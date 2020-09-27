import { useState } from 'react'
import Div from 'styled-kit/Div'
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
    <Div column flexNone listTop>
      <Div
        justifyBetween
        itemsCenter
        minHeight={40}
        padding="12px 8px"
        background="#f2f2f2"
        radius={3}
        onClick={handleClick}
        clickable
      >
        <span className="truncated">{user.login}</span>
        <Chevron isActive={isOpened} />
      </Div>

      {isOpened && <ReposList areReposBeingFetched={user.areReposBeingFetched} repos={user.repos} />}
    </Div>
  )
}
