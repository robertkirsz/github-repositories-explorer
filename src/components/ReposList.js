import Div from 'styled-kit/Div'
import ReposListItem from 'components/ReposListItem'
import InfoMessage from 'components/InfoMessage'

export default function ReposList({ isActive = false, areReposBeingFetched = false, repos = [] }) {
  const maxHeight = !isActive ? 0 : repos.length ? 368 : 34

  return (
    <Div
      column
      listTop={16}
      mobile={{ margin: '0 48px' }}
      style={{ maxHeight }}
      css={`
        overflow: ${maxHeight === 368 ? 'auto' : 'hidden'};
        transition: 0.3s;
      `}
    >
      {areReposBeingFetched ? (
        <InfoMessage center>Loading...</InfoMessage>
      ) : !repos.length ? (
        <InfoMessage center>User has no repos :(</InfoMessage>
      ) : (
        repos.map(repo => <ReposListItem key={repo.id} repo={repo} />)
      )}
    </Div>
  )
}
