import Div from 'styled-kit/Div'
import Emoji from 'components/Emoji'

export default function UsersListItem({ repo = {} }) {
  return (
    <Div column flex="1 0 100px" padding={8} listTop background="#e0e0e0" radius={3} css="word-break: break-all;">
      <Div justifyBetween itemsCenter fontWeight="bold">
        <a as="a" href={repo.html_url} target="_blank" rel="noreferrer">
          {repo.name}
        </a>

        <span>
          {repo.stargazers_count} <Emoji>⭐️</Emoji>
        </span>
      </Div>

      <span>{repo.description}</span>
    </Div>
  )
}
