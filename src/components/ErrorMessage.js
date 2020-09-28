import { useSelector } from 'react-redux'
import Div from 'styled-kit/Div'
import store from 'store'
import { clearErrors } from 'reducers/users'
import CloseButton from 'components/CloseButton'

export default function ErrorMessage() {
  const { errorMessage } = useSelector(({ users }) => users)

  function handleClick() {
    store.dispatch(clearErrors())
  }

  if (!errorMessage) return null

  return (
    <Div
      justifyBetween
      itemsCenter
      color="white"
      fontWeight="bold"
      background="red"
      radius={3}
      padding={8}
      listLeft={24}
      desktop={{ minWidth: 200, selfCenter: true }}
    >
      {errorMessage}
      <CloseButton onClick={handleClick} />
    </Div>
  )
}
