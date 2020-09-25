import styled from 'styled-components'

import Emoji from 'components/Emoji'

export default function UsersListItem({ repo = {} }) {
  return (
    <Wrapper>
      <span>{repo.name}</span>
      <span>
        {repo.stargazers_count} <Emoji>⭐️</Emoji>
      </span>
      <span>{repo.description}</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  background: #ddd;
  border: 1px solid;
  margin: 4px 0;
`
