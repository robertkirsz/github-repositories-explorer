import Div from 'styled-kit/Div'
import Logo from 'components/Logo'
import UsersList from 'components/UsersList'
import SearchInfo from 'components/SearchInfo'
import ErrorMessage from 'components/ErrorMessage'
import SearchMoreButton from 'components/SearchMoreButton'
import SearchUsersInput from 'components/SearchUsersInput'

export default function App() {
  return (
    <Div columnBottom maxWidth={480} mobile="flex: 1; overflow: hidden;">
      <Div mobile={{ listLeft: true }} desktop={{ columnTop: true }}>
        <Logo />
        <SearchUsersInput />
      </Div>

      <SearchInfo />
      <UsersList />
      <SearchMoreButton />
      <ErrorMessage />
    </Div>
  )
}
