import Div from 'styled-kit/Div'
import ReposListItem from 'components/ReposListItem'
import InfoMessage from 'components/InfoMessage'

export default function ReposList({ areReposBeingFetched = false, repos = [] }) {
  if (areReposBeingFetched) return <InfoMessage center>Loading...</InfoMessage>

  if (!repos.length) return <InfoMessage center>User has no repos :(</InfoMessage>

  return (
    <Div column listTop={16} maxHeight={368} mobile={{ margin: '0 48px' }} css="overflow: auto;">
      {repos.map(repo => (
        <ReposListItem key={repo.id} repo={repo} />
      ))}
    </Div>
  )
}
