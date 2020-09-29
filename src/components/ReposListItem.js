import Div from 'styled-kit/Div'
import Emoji from 'components/Emoji'

export default function UsersListItem({ repo = {} }) {
  return (
    <Div columnTop flex="1 0 100px" padding={8} background="#f2f2f2" radius={3} css="word-break: break-all;">
      <Div justifyBetween itemsCenter fontWeight="bold" listLeft={4}>
        <a as="a" href={repo.html_url} target="_blank" rel="noreferrer" className="truncated" css="color: inherit;">
          {repo.name}
        </a>

        <Div listLeft={4} itemsBaseline>
          <span>{repo.stargazers_count}</span> <Emoji>⭐️</Emoji>
        </Div>
      </Div>

      <span css="font-size: 0.9em; opacity: 0.8;">{repo.description}</span>
    </Div>
  )
}
