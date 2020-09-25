import styled from 'styled-components'

import ReposListItem from 'components/ReposListItem'

export default function ReposList({ repos = [] }) {
  if (repos.length === 0) return <NoReposMessage>User has no repos :(</NoReposMessage>

  return (
    <Wrapper>
      {repos.map(repo => (
        <ReposListItem key={repo.id} repo={repo} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const NoReposMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`
