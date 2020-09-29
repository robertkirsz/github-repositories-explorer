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
    store.dispatch(fetchUserRepos(user.login))
  }

  return (
    <Div columnTop flexNone>
      <Div
        justifyBetween
        itemsCenter
        minHeight={40}
        padding={8}
        desktop={{ padding: '12px 8px' }}
        background="#f2f2f2"
        radius={3}
        onClick={handleClick}
        clickable
      >
        <span className="truncated">{user.login}</span>
        <Chevron isActive={isOpened} />
      </Div>

      <ReposList isActive={isOpened} areReposBeingFetched={user.areReposBeingFetched} repos={user.repos} />
    </Div>
  )
}
