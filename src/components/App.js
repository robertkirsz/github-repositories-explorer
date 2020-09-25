import Div from 'styled-kit/Div'
import SearchInput from 'components/SearchInput'
import UsersList from 'components/UsersList'

export default function App() {
  return (
    <Div column itemsCenter listTop>
      <h1>GitHub Repositories Explorer</h1>
      <SearchInput />
      <UsersList />
    </Div>
  )
}
