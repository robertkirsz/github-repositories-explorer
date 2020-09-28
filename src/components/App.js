import Div from 'styled-kit/Div'
import Logo from 'components/Logo'
import UsersList from 'components/UsersList'
import SearchInfo from 'components/SearchInfo'
import ErrorMessage from 'components/ErrorMessage'
import SearchMoreButton from 'components/SearchMoreButton'
import SearchUsersInput from 'components/SearchUsersInput'

export default function App() {
  return (
    <Div column listTop width="100%" maxWidth={480} mobile="overflow: hidden;">
      <Logo />
      <SearchUsersInput />
      <SearchInfo />
      <UsersList />
      <SearchMoreButton />
      <ErrorMessage />
    </Div>
  )
}
