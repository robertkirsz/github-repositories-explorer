import Div from 'styled-kit/Div'
import UsersList from 'components/UsersList'
import SearchInfo from 'components/SearchInfo'
import SearchMoreButton from 'components/SearchMoreButton'
import SearchUsersInput from 'components/SearchUsersInput'
import ErrorMessage from 'components/ErrorMessage'

export default function App() {
  return (
    <Div column listTop width="100%" maxWidth={480} mobile="overflow: hidden;">
      <h1 className="title">Repos Explorer</h1>
      <SearchUsersInput />
      <SearchInfo />
      <UsersList />
      <SearchMoreButton />
      <ErrorMessage />
    </Div>
  )
}
