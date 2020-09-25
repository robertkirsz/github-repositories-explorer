import { useSelector } from 'react-redux'
import styled from 'styled-components'

export default function RequestStatusOverlay() {
  const isRequestPending = useSelector(state => state.users.pending)

  return isRequestPending ? <Wrapper>Loading...</Wrapper> : null
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: rgba(255, 255, 255, 0.7);

  font-size: 32px;
`
