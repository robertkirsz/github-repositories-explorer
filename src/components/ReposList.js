import Div from 'styled-kit/Div'
import ReposListItem from 'components/ReposListItem'
import InfoMessage from 'components/InfoMessage'

export default function ReposList({ isActive = false, areReposBeingFetched = false, repos = [] }) {
  const maxHeight = !isActive ? 0 : repos.length ? 368 : 34
  const showLoader = isActive && areReposBeingFetched
  const showUserHasNoRepos = isActive && !areReposBeingFetched && !repos.length
  const showRepos = repos.length > 0

  return (
    <Div
      columnTop
      margin="8px 32px"
      overflow={isActive && showRepos ? 'auto' : 'hidden'}
      css="transition: max-height 0.3s;"
      desktop={{ margin: 8 }}
      style={{ maxHeight }}
    >
      {showLoader && <InfoMessage center>Loading...</InfoMessage>}

      {showUserHasNoRepos && <InfoMessage center>User has no repos :(</InfoMessage>}

      {showRepos && repos.map(repo => <ReposListItem key={repo.id} repo={repo} />)}
    </Div>
  )
}
